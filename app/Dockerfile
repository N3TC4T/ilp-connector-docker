FROM node:alpine

# File Author / Maintainer
MAINTAINER N3TC4T <netcat.av@gmail.com>

# set env variables
ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /srv/app

RUN \
  apk add --update git python g++ make && \
  rm -rf /var/cache/apk/* && \
  git clone https://github.com/interledgerjs/ilp-connector.git . && \
  npm install && \
  npm install ilp-plugin-btp ilp-plugin-mini-accounts ilp-plugin-xrp-paychan ilp-plugin-xrp-asym-server && \
  npm run build && \
  npm install -g pm2@latest && \
  apk del git python g++ make

# Create connector data directory
RUN mkdir -p /srv/app/connector-data

VOLUME /srv/app/connector-data

# Copy PM2 config and start script
COPY launch.config.js .

EXPOSE 8080
EXPOSE 7769
EXPOSE 7768

CMD [ "pm2-docker", "start", "launch.config.js" ]


