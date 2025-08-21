(function navActive(){
  const current = location.pathname.split('/').filter(Boolean).slice(-2)[0];
  document.querySelectorAll('.nav a').forEach(a=>{
    if(a.getAttribute('href').includes(`../${current}/`)) a.classList.add('active');
  });
})();

document.addEventListener('DOMContentLoaded', ()=>{
  const m = document.getElementById('resMount');
  const data = [
    {type:'课程', title:'CS50x', url:'https://cs50.harvard.edu/x/', desc:'计算机科学入门经典'},
    {type:'文档', title:'MDN Web Docs', url:'https://developer.mozilla.org/zh-CN/', desc:'Web 标准与 API 权威文档'},
    {type:'网页', title:'You Don’t Know JS', url:'https://github.com/getify/You-Dont-Know-JS', desc:'JS 原理深入'},
    {type:'课程', title:'Coursera 算法 I/II', url:'https://www.coursera.org/specializations/algorithms', desc:'算法与数据结构'},
    {type:'文档', title:'Chart.js', url:'https://www.chartjs.org/', desc:'轻量图表库'},
    {type:'网页', title:'Web.dev', url:'https://web.dev/', desc:'现代 Web 最佳实践'}
  ];
  m.innerHTML = data.map(r=>`
    <div class="card res">
      <span class="tag">${r.type}</span>
      <div>
        <a href="${r.url}" target="_blank" rel="noopener">${r.title}</a>
        <div class="muted">${r.desc}</div>
      </div>
    </div>
  `).join('');
});
