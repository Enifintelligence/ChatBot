FROM   node:16.0.0-alpine as build


WORKDIR /app

COPY . .
ARG NODE_ENV=production

RUN npm i

RUN npm run build

COPY package-lock.json ./


FROM build as production

COPY --from=build /app/build ./build

EXPOSE 4001

CMD ["npm", "start"]
