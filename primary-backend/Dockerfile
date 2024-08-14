FROM node:18-alpine

WORKDIR /app


COPY package* .
COPY ./prisma .



RUN npm install
RUN npx prisma generate

COPY . .


RUN tsc -b


EXPOSE 3000

CMD ["node", "dist/index.js"]
