

const http = require('http');

http.createServer((req, res) => {
  return res.end('hello')
}).listen(3000);
