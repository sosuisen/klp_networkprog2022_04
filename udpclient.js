const dgram = require('dgram');

let message = 'Hello!';
if (process.argv.length >= 3) {
  message = process.argv[2];
}

const socket = dgram.createSocket({ type: 'udp4' }, msg => {
  console.log(msg.toString());
  socket.close();
});
socket.send(message, 10001, 'localhost');