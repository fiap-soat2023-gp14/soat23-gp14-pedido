FROM node:16-alpine
WORKDIR /app
COPY src .
COPY package.json .
ARG PORT=8080
RUN yarn install
EXPOSE ${PORT}
CMD ["yarn", "start"]