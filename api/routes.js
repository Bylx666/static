

module.exports = {
  get: function(urlpath) {
    if(typeof urlpath==='string') {
      if(urlpath==='/api'||urlpath==='/') {
        return new Ret({
          status: 'ok'
        })
      };
      urlpath = urlpath.replace('/api/', '');
      function Ret(content, mime) {
        if(mime==='json'||!mime) {
          this.c = JSON.stringify(content);
          this.m = 'application/json';
        }else {
          this.c = content;
          this.m = mime;
        };
      };
      function dt(st) {
        if(urlpath===st||urlpath===st+'/') return true
        else return false;
      };
      if(dt('a')) {
        return new Ret({
          a: 'test',
          b: 'ssss'
        });
      }else if(urlpath.startsWith('dir')) {
        if(urlpath==='dir') {
          return new Ret({err:'Directory path required.'})
        };
        const dirpath = urlpath.replace('dir/','');
        return new Ret(require('./lib/readdir').get(dirpath));
      }else if(urlpath.startsWith('file')) {
        if(urlpath==='file') {
          return new Ret({err:'File path required.'});
        };
        const filepath = urlpath.replace('file/','');
        const readfile = require('./lib/readfile');
        const file = readfile.get(filepath);
        var mime = file.err ? 'json' : mine = readfile.getMime(filepath);
        return new Ret(file, mime);
      };
    }else return false;
  }
};
