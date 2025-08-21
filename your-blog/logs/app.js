(function navActive(){
  const current = location.pathname.split('/').filter(Boolean).slice(-2)[0];
  document.querySelectorAll('.nav a').forEach(a=>{
    if(a.getAttribute('href').includes(`../${current}/`)) a.classList.add('active');
  });
})();

document.addEventListener('DOMContentLoaded', ()=>{
  const mount = document.getElementById('logsMount');
  const logs = [
    {d:'2025-08-12', t:'完善博客框架与布局比例（1/6-2/3-1/6）'},
    {d:'2025-08-15', t:'相册页加入 Lightbox 交互'},
    {d:'2025-08-18', t:'投资模块集成 Chart.js，支持净值切换'},
    {d:'2025-08-20', t:'优化移动端导航，保持“主页面不滚动”的意图'}
  ];
  mount.innerHTML = logs.map(l=>`
    <div class="t-item">
      <div class="muted">${l.d}</div>
      <div>${l.t}</div>
    </div>
  `).join('');
});
