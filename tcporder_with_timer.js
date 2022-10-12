const net = require('net');

const max = 1000; 
// const max = 100000; 

// 10 のアルファベットが格納された配列
// 配列リテラル内で文字列にスプレッド演算子...を使うと、
// 文字列を1文字ずつ分解した配列へ変換できる
// alphabet = ['a','b','c','d','e','f','g','h','i','j']; と同じ
const alphabet = [...'abcdefghij'];

console.time('bench');
const socket = net.createConnection({ host: 'localhost', port: 10000}, () => {
  for (let i = 0; i < max; i++) {
    socket.write(alphabet[i % 10]);
  }
});

receivedText = '';
socket.on('data', data => {
  // データは１つずつではなく、幾つかのかたまりになって届く。
  // 1つのかたまりごとに data イベントが発生する。
  // 環境によるが max を 100000 くらいにすると
  // 複数回の data イベントに分かれて受信されるので、
  // 念のためすべて受信を終えるまでここで受信データを繋げる必要がある
  // console.log(`--- received:\n${data.toString()}`);
  receivedText += data;

  // localhost上の通信なのでエラーは起こらないものとする
  if (receivedText.length === max) {
    socket.end();
    console.timeEnd('bench');

    const receivedArr = [...receivedText];
    let miss = 0;
    for (let i = 0; i < max; i++) {
      if (receivedArr[i] !== alphabet[i % 10]) miss++;
    }
    console.log(`Out of order: ${miss}`);
  }
});
