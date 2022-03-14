!function(){
  function get(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.send();
    xhr.onreadystatechange = ()=>{
      if(xhr.readyState===4) {
        cb(xhr.response);
      };
    };
  };

  var loadDuration = 0;
  const timeCounter = setInterval(()=>{
    loadDuration += 0.1;
    document.getElementById('loading').style.transform = `rotate(${loadDuration*180}deg)`;
    document.getElementById('load-time').textContent = loadDuration.toFixed(1);
  },100);

  const pathname = location.pathname;
  get('/api/dir'+location.pathname, (res)=>{
    clearInterval(timeCounter);
    res = JSON.parse(res);
    if(res.err) {
      document.getElementById('loading').classList.add('failed');
      console.error('no such dir');
      const div = document.createElement('div');
      div.insertAdjacentHTML('afterbegin',`
        <img src="/asset/img/ban.svg" alt="forbidden"/>
        Error: <span class="error">${res.err}</span>
      `);
      document.getElementById('fileList').append(div);
    }else {
      if(res.d.length===0&&res.f.length===0) {
        document.getElementById('loading').classList.add('empty');
        const div = document.createElement('div');
        div.insertAdjacentHTML('afterbegin',`
          <img src="/asset/img/info.svg" alt="information"/>
          <span class="info">This is an empty folder~</span>
        `);
        document.getElementById('fileList').append(div);
        return false;
      };
      document.getElementById('loading').classList.add('succeed');
      res.d.forEach((dir)=>{
        const div = document.createElement('div');
        div.insertAdjacentHTML('afterbegin',`
          <img src="/asset/img/folder.svg" alt="folder"/>
          <span class="name">${dir.name}</span>
        `);
        div.onclick = ()=>{
          location.pathname = pathname + 
            (pathname.endsWith('/') ? '' : '/') +
            dir.name;
        };
        document.getElementById('fileList').append(div);
      });
      res.f.forEach((file)=>{
        const div = document.createElement('div');
        div.insertAdjacentHTML('afterbegin',`
          <img src="/asset/img/file.svg" alt="file"/>
          <span class="name">${file.name}</span>
        `);
        div.onclick = ()=>{
          location.pathname = 
            '/api/file/' + 
            pathname + 
            (pathname.endsWith('/') ? '' : '/') + 
            file.name;
        };
        document.getElementById('fileList').append(div);
      });
    };
  });

  const navs = pathname.split('/');
  navs.forEach((nav, index)=>{
    const a = document.createElement('a');
    if(index===0) {
      nav = '/';
    };
    if(nav==='') return false;
    a.textContent = nav;
    var dirpath = '/';
    for(var i = 0;i<index;i++) {
      dirpath += navs[i+1]+'/';
    };
    a.href = dirpath;
    document.getElementById('breadcrumbs').append(a);
  });
  if(!navs[1]) {
    document.getElementById('return').style.display = 'none';
  }else {
    document.getElementById('return').onclick = ()=>{
      navs.pop();
      if(navs.length===1) {
        location.href = '/';
      }else {
        location.href = navs.join('/');
      };
    };
  };
}();