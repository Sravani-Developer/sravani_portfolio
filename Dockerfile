# 1) Build (Debian-based Node to avoid Alpine native build issues)
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

# 2) Serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["sh", "-c", "sed -i 's/listen\\s\\+80;/listen 8080;/' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
