const server = require('./server');

server.listen({port: 4003}).then(({url}) => {
    console.log("Comment service running at: " + url);
});
