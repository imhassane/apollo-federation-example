# Pull base image.
FROM ubuntu:latest

# Install Node.js
RUN apt-get install --yes curl
RUN curl --silent --location https://deb.nodesource.com/setup_4.x | sudo bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential

COPY . /src

# Install app dependencies
RUN cd /src; npm install

# Binds to port 4001
EXPOSE  4001

CMD npm run dev