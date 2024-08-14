FROM node:18-alpine




WORKDIR /app

env DATABASE_URL=postgresql://hunain:gA7XEf3YQcJlWLRxN3Lux4LtPHr73WPe@dpg-cqu7r83v2p9s73d2hia0-a.frankfurt-postgres.render.com/hunain
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
