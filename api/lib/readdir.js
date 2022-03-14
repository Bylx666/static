const fs = require('fs');
const path = require('path')

module.exports = {
  get: (dirpath)=>{
    if(typeof dirpath==='string') {
      dirpath = path.resolve(decodeURIComponent(dirpath));
      try {
        const fileList = fs.readdirSync(dirpath);
        let dirs = [];
        let files = []
        fileList.forEach((file)=>{
          const stat = fs.statSync(
            path.join(dirpath, file)
          );
          const retObj = {
            name: file,
            atime: stat.atime,
            mtime: stat.mtime,
            birthtime: stat.birthtime,
            size: stat.size
          }
          if(stat.isDirectory()) {
            dirs.push(retObj)
          }else if(stat.isFile()) {
            files.push(retObj)
          }
        })
        return {
          d: dirs,
          f: files
        };
      } catch (err) {
        return {err: err.message};
      };
    }else return false;
  }
};
