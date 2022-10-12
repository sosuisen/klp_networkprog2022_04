const net = require('net');
const server = net.createServer(socket => socket.on('data', data => socket.write(data)));
server.listen({ host: 'localhost', port: 10000}, () => console.log('Start TCP server...'));
