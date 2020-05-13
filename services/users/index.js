const server = require('./server');

server.listen({port: 4001}).then(({url}) => {
    console.log("Users service running at: " + url);
})