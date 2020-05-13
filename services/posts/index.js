const server = require('./server');

server.listen({port: 4002}).then(({url}) => console.log("Posts service running at: " + url));
