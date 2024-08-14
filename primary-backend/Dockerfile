FROM node:18-alpine

WORKDIR /app


COPY package* .
COPY ./prisma .
COPY ./dist .


RUN npm install
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["node", "dist/index.js"]