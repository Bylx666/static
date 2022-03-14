const fs = require('fs');
const path = require('path');
const mimes = {
  js: 'application/javascript',
  json: 'application/json',
  css: 'text/css',
  mp3: 'audio/mpeg',
  html: 'text/html',
  flac: 'audio/x-flac',
  svg: 'image/svg+xml'
}

module.exports = {
  get: (filepath)=>{
    if(typeof filepath==='string') {
      filepath = path.resolve(decodeURIComponent(filepath));
      try {
        return fs.readFileSync(filepath);
      }catch (err) {
        return {err: err.message};
      };
    }else return false;
  },
  getMime: (filename)=>{
    if(typeof filename==='string') {
      if(!filename.includes('.')) {
        return 'text/plain';
      }else {
        const points = filename.split('.');
        const mime = points[points.length-1];
        if(mimes[mime]) {
          return mimes[mime];
        }else {
          return 'text/plain';
        };
      };
    }else return false;
  }
};
