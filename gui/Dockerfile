FROM node:alpine

# File Author / Maintainer
MAINTAINER N3TC4T <netcat.av@gmail.com>

# set env variables
ENV NPM_CONFIG_LOGLEVEL warn

# install git and
RUN apk add --no-cache git

# Create app directory
WORKDIR /srv/app


# clone the app
RUN git clone https://github.com/interledgerjs/moneyd-gui.git .


# Install app dependencies
RUN npm install


EXPOSE 7770

CMD npm start

