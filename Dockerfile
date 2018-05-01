FROM node:9.11.1-alpine

# Create app directory
WORKDIR /app

# Bundle app source
ADD . /app

RUN yarn

ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT

CMD [ "npm", "start" ]
