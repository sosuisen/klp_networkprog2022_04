const net = require('net');

const max = 1000; 
const alphabet = [...'abcdefghij'];

console.time('bench');

receivedText = '';
for (let i = 0; i < max; i++) {
  const socket = net.createConnection({ host: 'localhost', port: 10000}, () => {
    socket.write(alphabet[i % 10]);
  });
  socket.on('data', data => {
    // 送信データが小さいため、1回で受信できる。
    receivedText += data;
    socket.end();
    if (receivedText.length === max) {
      console.timeEnd('bench');
    }
  });
}

