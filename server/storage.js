import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { MongoClient } from "mongodb";
import { config } from "./config.js";

const dataDir = resolve("server/data");

const files = {
  projects: resolve(dataDir, "projects.json"),
  contacts: resolve(dataDir, "contacts.json"),
  events: resolve(dataDir, "events.json"),
};

let mongoClientPromise;

function resetMongoClient() {
  mongoClientPromise = undefined;
}

async function getMongoDb() {
  if (!config.mongoUri) {
    return null;
  }

  if (!mongoClientPromise) {
    const client = new MongoClient(config.mongoUri);
    mongoClientPromise = client.connect();
  }

  const client = await mongoClientPromise;
  return client.db(config.mongoDbName);
}

async function withMongoRetry(operation) {
  const db = await getMongoDb();

  if (!db) {
    return null;
  }

  try {
    return await operation(db);
  } catch {
    resetMongoClient();
    const retryDb = await getMongoDb();
    return operation(retryDb);
  }
}

async function ensureFile(filePath) {
  await mkdir(dirname(filePath), { recursive: true });

  if (!existsSync(filePath)) {
    await writeFile(filePath, "[]", "utf8");
  }
}

export async function readCollection(name) {
  const mongoResult = await withMongoRetry((db) =>
    db.collection(name).find({}, { projection: { _id: 0 } }).toArray()
  );

  if (mongoResult) {
    return mongoResult;
  }

  const filePath = files[name];

  if (!filePath) {
    throw new Error(`Unknown collection: ${name}`);
  }

  await ensureFile(filePath);
  const raw = await readFile(filePath, "utf8");

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function writeCollection(name, data) {
  const mongoResult = await withMongoRetry(async (db) => {
    const collection = db.collection(name);
    await collection.deleteMany({});

    if (data.length) {
      await collection.insertMany(data);
    }

    return true;
  });

  if (mongoResult) {
    return;
  }

  const filePath = files[name];

  if (!filePath) {
    throw new Error(`Unknown collection: ${name}`);
  }

  await ensureFile(filePath);
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export function createId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
