const fs = require('fs');
const http = require('http');
const routes = require('./routes');

http.createServer((REQ, RES)=>{
  RES.setHeader('allow-control-access-origin', '*')
  const url = REQ.url;
  const res = routes.get(url);
  if(!res) {
    RES.end('Invalid API');
  }else {
    RES.writeHead(200, {'content-type': res.m});
    RES.end(res.c);
  };
}).listen(2333);
