#Build stage
FROM node:20 AS build

WORKDIR /app

COPY package*.json .

RUN npm install 

COPY . .

RUN npm run build

# Production stage
FROM node:20 AS production

WORKDIR /app

COPY package*.json .  

RUN npm install 

COPY --from=build /app/dist ./dist  

CMD ["npm", "run", "start"]  