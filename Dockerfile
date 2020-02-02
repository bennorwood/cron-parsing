FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app

COPY . .

LABEL maintainer="Ben Norwood <ben.norwood821@gmail.com>" \
      version="0.1"

CMD parse-cron.sh
