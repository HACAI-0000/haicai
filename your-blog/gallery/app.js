(function navActive(){
  const current = location.pathname.split('/').filter(Boolean).slice(-2)[0];
  document.querySelectorAll('.nav a').forEach(a=>{
    if(a.getAttribute('href').includes(`../${current}/`)) a.classList.add('active');
  });
})();

document.addEventListener('DOMContentLoaded', ()=>{
  const g = document.getElementById('gallery');
  const pics = Array.from({length:12}, (_,i)=>`https://picsum.photos/seed/optic-${i+1}/600/400`);
  g.innerHTML = pics.map(src=>`<img src="${src}" alt="photo">`).join('');
  const lb = document.querySelector('.lightbox');
  g.addEventListener('click', e=>{
    const img = e.target.closest('img'); if(!img) return;
    lb.querySelector('img').src = img.src.replace('/600/400','/1200/800');
    lb.classList.add('is-open');
  });
  lb.addEventListener('click', ()=> lb.classList.remove('is-open'));
});
