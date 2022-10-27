const dgram = require('dgram');
const max = 1000;
const alphabet = [...'abcdefghij'];
const socket = dgram.createSocket({ type: 'udp4' });
for (let i = 0; i < max; i++) {
  socket.send(i + ':' + alphabet[i % 10], 10001, 'localhost');
}
const received = [];
socket.on('message', msg => {
  received.push(msg.toString());
//  console.log(`${Object.keys(received).length}/${max} [${msg}]`);

  if (received.length === max) {
    socket.close();

    // ソートのアルゴリズムを自分で変更できます。
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // 配列に入った値の「：」より前の値だけ取り出して
    // 比較しています。
    received.sort((a, b) => {
      const arrA = a.split(':');
      const arrB = b.split(':');
      const intA = parseInt(arrA[0]);
      const intB = parseInt(arrB[0]);
        return intA - intB;
    });

    // 配列に入った値の「:」より後ろ側の値だけ取り出して
    // 別の配列をつくります。
    const received2 = received.map(str => {
      const arr = str.split(':');
      return arr[1];
    });
  
    let miss = 0;
    for (let i = 0; i < max; i++) {
      if (received2[i] !== alphabet[i % 10].toString()) miss++;
    }
    console.log(`Out of order : ${miss}`);
  }
});
