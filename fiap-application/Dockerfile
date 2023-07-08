FROM node:16-alpine
WORKDIR /app
COPY . .
ARG PORT=8080
RUN yarn install
EXPOSE ${PORT}
CMD ["yarn", "start"]