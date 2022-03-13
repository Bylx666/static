const fs = require('fs');
const http = require('http');
const routes = require('./routes');

http.createServer((REQ, RES)=>{
  const url = REQ.url;
  const res = routes.get(url);
  if(!res) {
    RES.end('e');
  }else {
    RES.writeHead(200, {'content-type': res.m});
    RES.end(res.c);
  };
}).listen(2333);
