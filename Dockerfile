FROM node:lts-alpine

RUN mkdir /.bin
WORKDIR /.bin

COPY . .

LABEL maintainer="Ben Norwood <ben.norwood821@gmail.com>" \
      version="0.1"

COPY parse-cron.js parse-cron.js
RUN chmod +x parse-cron.js

CMD /.bin/parse-cron.js
