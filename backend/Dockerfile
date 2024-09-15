FROM node:alpine
# FROM --platform=linux/amd64 node:alpine

WORKDIR /usr/src/app

# Copy root package.json and lockfile
COPY backend/package.json ./
COPY backend/yarn.lock ./

RUN yarn

# Copy app source
COPY . .

EXPOSE 3000

CMD [ "node", "backend/index.js" ]