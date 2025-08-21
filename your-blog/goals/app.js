(function navActive(){
  const current = location.pathname.split('/').filter(Boolean).slice(-2)[0];
  document.querySelectorAll('.nav a').forEach(a=>{
    if(a.getAttribute('href').includes(`../${current}/`)) a.classList.add('active');
  });
})();

document.addEventListener('DOMContentLoaded', ()=>{
  const wrap = document.getElementById('goalsWrap');
  const goals = {
    short:[
      {title:'每天 30 分钟英文精读', progress:70, due:'2025-09-30'},
      {title:'完成 3 篇书摘输出', progress:40, due:'2025-09-10'},
    ],
    mid:[
      {title:'拍摄并整理 30 张摄影作品', progress:55, due:'2025-12-31'},
      {title:'博客无障碍优化（WCAG AA）', progress:15, due:'2025-11-15'},
    ],
    long:[
      {title:'投资体系回测 + 实盘 ≥ 24 个月', progress:20, due:'2027-06-01'},
      {title:'出版一本前端小册（100 页+）', progress:5, due:'2026-12-31'},
    ]
  };
  function block(list, cls){
    return list.map(g=>`
      <div class="card goal ${cls}">
        <div class="row" style="justify-content:space-between">
          <strong>${g.title}</strong><span class="muted">${g.due}</span>
        </div>
        <div class="progress"><i style="width:${g.progress}%"></i></div>
        <div class="row" style="justify-content:space-between">
          <span class="muted">进度：<b>${g.progress}%</b></span>
          <div class="row">
            <button class="tag" data-delta="-5">-5%</button>
            <button class="tag" data-delta="5">+5%</button>
          </div>
        </div>
      </div>
    `).join('');
  }
  wrap.innerHTML = `
    <div class="columns">
      <section>${block(goals.short,'short')}</section>
      <section>${block(goals.mid,'mid')}</section>
      <section>${block(goals.long,'long')}</section>
    </div>
  `;
  // 小交互
  document.querySelectorAll('.goal .tag').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const delta = parseInt(btn.dataset.delta,10);
      const card = btn.closest('.goal');
      const bar = card.querySelector('.progress > i');
      const label = card.querySelector('.row .muted b');
      const now = Math.max(0, Math.min(100, parseInt(bar.style.width,10) + delta));
      bar.style.width = now + '%';
      label.textContent = now + '%';
    });
  });
});
