
# Pull base image.
FROM node:latest

COPY . /src/

# Install app dependencies
WORKDIR /src

RUN npm install

# Binds to port 4003
EXPOSE  4003

CMD npm run dev