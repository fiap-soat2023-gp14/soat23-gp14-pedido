FROM node:16-alpine
WORKDIR /app
COPY ./dist .
ARG PORT=8080
EXPOSE ${PORT}
CMD ["yarn", "start:prod"]