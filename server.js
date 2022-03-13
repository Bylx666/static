const fs = require('fs');
const http = require('http');

const server = http.createServer((REQ, RES)=>{
  var url = REQ.url;
  if(url.startsWith('/api')) {
    const req = http.request('http://localhost:2333'+url,(res)=>{
      var result
      res.on('data', (chunk)=>{
        result += chunk;
      });
      res.on('end', ()=>{
        RES.end(result);
      });
    }).end();
  }else {
    RES.writeHead(200, {
      'content-type': 'text/html'
    })
    RES.end(fs.readFileSync('./index.html'));
  };
}).listen(80);
