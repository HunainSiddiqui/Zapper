FROM node:18-alpine

WORKDIR /app


COPY package* .
COPY ./prisma .



RUN npm install
RUN npx prisma generate

COPY . .


RUN npm run build

run npx prisma migrate deploy
run npx prisma generate
run npm run seed



EXPOSE 3000

CMD ["node", "dist/index.js"]
