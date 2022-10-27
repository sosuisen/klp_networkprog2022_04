const dgram = require('dgram');
const max = 1000;
const alphabet = [...'abcdefghij'];
const socket = dgram.createSocket({ type: 'udp4' });
for (let i = 0; i < max; i++) {
  socket.send(i + ':' + alphabet[i % 10], 10001, 'localhost');
}
const received = {};
socket.on('message', msg => {
  const msgArr = msg.toString().split(':');
  received[msgArr[0]] = msgArr[1];
  console.log(`${Object.keys(received).length}/${max} [${msg}]`);

  if (Object.keys(received).length === max) {
    socket.close();

    let sorted = [];
    for (let i = 0; i < max; i++) {
      sorted.push(received[i]);
    }
    // Object.values() は、数字のキーをもつオブジェクトの場合、
    // キーの番号順で並んだ値の配列を返す。
    // よって、上の for文の代わりに次のようにしても同じ。
    // const sorted = Object.values(received);

    let miss = 0;
    for (let i = 0; i < max; i++) {
      if (sorted[i] !== alphabet[i % 10].toString()) miss++;
    }
    console.log(`Out of order : ${miss}`);
  }
});
