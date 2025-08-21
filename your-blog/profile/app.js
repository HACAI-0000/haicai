(function navActive(){
  const current = location.pathname.split('/').filter(Boolean).slice(-2)[0]; // 目录名
  document.querySelectorAll('.nav a').forEach(a=>{
    if(a.getAttribute('href').includes(`../${current}/`)) a.classList.add('active');
  });
})();

