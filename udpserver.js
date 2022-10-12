const dgram = require('node:dgram');
const socket = dgram.createSocket({ type: 'udp4' }, (msg, rinfo) => socket.send(msg, rinfo.port, rinfo.address));
socket.bind(10001, 'localhost', () => console.log('Start UDP server...'));
