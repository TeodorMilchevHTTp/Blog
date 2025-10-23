FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build React app
RUN npm run build

EXPOSE 5000

# Start backend (Express serves React build)
CMD ["node", "backend/server.js"]
