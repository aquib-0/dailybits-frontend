FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# Vite needs the --host flag to allow access from outside the container
CMD ["npm", "run", "dev", "--", "--host"]