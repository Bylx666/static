const fs = require('fs');
const path = require('path')

module.exports = {
  get: (dirpath)=>{
    if(typeof dirpath==='string') {
      dirpath = path.resolve(dirpath);
      try {
        return fs.readdirSync(dirpath);
      } catch (err) {
        return {err: err.message};
      };
    }else return false;
  }
};
