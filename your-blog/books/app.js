(function navActive(){
  const current = location.pathname.split('/').filter(Boolean).slice(-2)[0];
  document.querySelectorAll('.nav a').forEach(a=>{
    if(a.getAttribute('href').includes(`../${current}/`)) a.classList.add('active');
  });
})();

document.addEventListener('DOMContentLoaded', ()=>{
  const mount = document.getElementById('booksMount');
  const data = [
    {title:'《小王子》', note:'真正重要的东西用眼睛是看不见的。', tags:['文学','哲思'], date:'2024-12-03'},
    {title:'《Clean Code》', note:'命名即设计：好的命名减少注释需求。', tags:['编程','实践'], date:'2025-02-11'},
    {title:'《刻意练习》', note:'建立反馈环与刻意目标，让练习走出舒适区。', tags:['技能','方法论'], date:'2025-05-20'},
    {title:'《原则》', note:'极度求真 + 极度透明 = 可复盘的系统。', tags:['管理','系统思维'], date:'2025-06-19'},
    {title:'《The Pragmatic Programmer》', note:'追求可替换性，避免“金锤子”。', tags:['编程','工程文化'], date:'2025-03-29'},
    {title:'《原子习惯》', note:'把“身份”嵌入习惯设计中。', tags:['习惯','行为'], date:'2024-10-08'},
  ];
  mount.innerHTML = data.map(b=>`
    <article class="card note">
      <h4>${b.title}</h4>
      <div class="meta">
        <span class="tag">笔记</span>
        ${b.tags.map(t=>`<span class="tag">${t}</span>`).join('')}
        <span class="muted">· ${b.date}</span>
      </div>
      <p>${b.note}</p>
    </article>
  `).join('');
});
