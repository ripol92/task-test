FROM node:18

WORKDIR /app

COPY package.json tsconfig.json ./
RUN npm install
COPY . ./

CMD ["npm", "start"]

EXPOSE 3000
