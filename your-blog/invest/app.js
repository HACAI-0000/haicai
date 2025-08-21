(function navActive(){
  const current = location.pathname.split('/').filter(Boolean).slice(-2)[0];
  document.querySelectorAll('.nav a').forEach(a=>{
    if(a.getAttribute('href').includes(`../${current}/`)) a.classList.add('active');
  });
})();

document.addEventListener('DOMContentLoaded', ()=>{
  const c = document.getElementById('equityChart');
  if(!c) return;

  const fmt = new Intl.NumberFormat('zh-CN',{maximumFractionDigits:2});
  const sum = arr => arr.reduce((a,b)=>a+b,0);

  // 示例：月收益率（%）
  const monthlyRet = [2.1,-1.3,0.8,3.5,1.1,-0.9,2.2,1.6,-0.4,2.9,1.4,0.7];
  const labels = Array.from({length:12}, (_,i)=>`2025-${String(i+1).padStart(2,'0')}`);

  // 计算净值
  const nav = []; let v=1;
  monthlyRet.forEach(r=>{ v*=(1+r/100); nav.push(v); });

  // KPI
  const totalRet = (v-1)*100;
  const avgR = sum(monthlyRet)/monthlyRet.length;
  const winRate = (monthlyRet.filter(x=>x>0).length / monthlyRet.length)*100;
  const vol = Math.sqrt(sum(monthlyRet.map(x=>x*x))/monthlyRet.length) * Math.sqrt(12);

  document.getElementById('kpi').innerHTML = `
    <div class="card"><div class="muted">年内累计</div><strong>${fmt.format(totalRet)}%</strong></div>
    <div class="card"><div class="muted">月均收益</div><strong>${fmt.format(avgR)}%</strong></div>
    <div class="card"><div class="muted">胜率</div><strong>${fmt.format(winRate)}%</strong></div>
    <div class="card"><div class="muted">波动率(估)</div><strong>${fmt.format(vol)}%</strong></div>
  `;

  const ctx = c.getContext('2d');
  const chart = new Chart(ctx,{
    type:'line',
    data:{
      labels,
      datasets:[
        { label:'月收益率(%)', data:monthlyRet, yAxisID:'y1',
          borderColor:'#3fc1ff', backgroundColor:'rgba(63,193,255,.2)', tension:.25, fill:true },
        { label:'净值', data:nav, yAxisID:'y2',
          borderColor:'#6be675', backgroundColor:'rgba(107,230,117,.15)', tension:.2 }
      ]
    },
    options:{
      responsive:true, maintainAspectRatio:false, interaction:{mode:'index', intersect:false},
      scales:{
        y1:{type:'linear', position:'left', grid:{color:'#253152'}, ticks:{color:'#a9c1ff'}},
        y2:{type:'linear', position:'right', grid:{display:false}, ticks:{color:'#a7efbd'}},
        x:{grid:{color:'#22314f'}, ticks:{color:'#a9b1c3'}}
      },
      plugins:{
        legend:{labels:{color:'#cfe1ff'}},
        tooltip:{callbacks:{
          label:(ctx)=> ctx.datasetIndex===0 ? `月收益率: ${fmt.format(ctx.parsed.y)}%`
                                             : `净值: ${ctx.parsed.y.toFixed(3)}`
        }}
      }
    }
  });

  // 显隐切换
  document.querySelectorAll('#investToggles input[type=checkbox]').forEach((chk,i)=>{
    chk.addEventListener('change', ()=>{ chart.setDatasetVisibility(i, chk.checked); chart.update(); });
  });
});
