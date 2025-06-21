FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . . 
    
COPY ./.env . 
 
# RUN mkdir -p /db

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
 
