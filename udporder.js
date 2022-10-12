const dgram = require('dgram');

const max = 1000; 

// 10 のアルファベットが格納された配列
// 配列リテラル内で文字列にスプレッド演算子...を使うと、
// 文字列を1文字ずつ分解した配列へ変換できる
// alphabet = ['a','b','c','d','e','f','g','h','i','j']; と同じ
const alphabet = [...'abcdefghij'];

const socket = dgram.createSocket({ type: 'udp4' });

for (let i = 0; i < max; i++) {
  socket.send(alphabet[i % 10], 10001, 'localhost');
}

const received = [];
socket.on('message', msg => {
  // データは1つずつ届く
  received.push(msg.toString());
  console.log(`${received.length}/${max} [${msg}]`);
  // localhost上の通信なのでエラーは起こらないものとする  
  if(received.length === max){
    socket.close();

    let miss = 0;
    for (let i = 0; i < max; i++) {
        if (received[i] !== alphabet[i % 10].toString()) miss++;
    }
    console.log(`Out of order : ${miss}`);
  }
});

