import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { hashPassword } from "./auth.js";

const password = process.argv[2];

if (password) {
  console.log(hashPassword(password));
} else {
  const readline = createInterface({ input, output });
  const answer = await readline.question("Admin password to hash: ");
  readline.close();
  console.log(hashPassword(answer));
}
