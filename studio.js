/* Road to 21K Studio — actionable home, local-first, no external analytics. */
(function(){
'use strict';
const base=home;
const escStudio=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&quot;',"'":'&#39;'}[c]));
const num=v=>Number.isFinite(Number(v))?Number(v):0;
function monday(d){const x=new Date(d);x.setHours(12,0,0,0);x.setDate(x.getDate()-(x.getDay()+6)%7);return x}
function dateKey(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function weekSeries(logs,now=new Date()){const start=monday(now),buckets=Array.from({length:7},(_,i)=>({date:dateKey(new Date(start.getFullYear(),start.getMonth(),start.getDate()+i,12)),minutes:0,count:0}));for(const log of logs){let b=buckets.find(x=>x.date===log.date);if(b){b.minutes+=Math.max(0,num(log.min));b.count++}}return buckets}
function getSummary(logs,now=new Date()){let series=weekSeries(logs,now),active=series.filter(x=>x.count>0).length,total=series.reduce((a,x)=>a+x.minutes,0);return {series,active,total}}
function renderStudio(){
 const root=document.getElementById('view');if(!root)return;
 const logs=Array.isArray(db.logs)?db.logs:[],now=new Date(),summary=getSummary(logs,now),max=Math.max(20,...summary.series.map(x=>x.minutes));
 const week=typeof weeks==='function'?weeks():1,day=(now.getDay()+6)%7,s=schedule(week)[day],km=Math.max(.5,Math.round(Math.max(0,s.min)*Math.max(1,Math.min(8,num(db.speed)||3.5))/60*2)/2);
 const heading=document.createElement('div');heading.className='studio-heading';heading.innerHTML='<div class="studio-heading-line"><div><span class="studio-kicker">IL TUO SPAZIO</span><h3>Inizia da qui<span class="studio-period">.</span></h3></div><span class="studio-live"><span></span> PRONTO PER OGGI</span></div>';
 const grid=document.createElement('div');grid.className='studio-actions';grid.innerHTML='<button class="studio-action studio-action-dark" onclick="road21.open(\'coach\')"><span class="studio-action-icon">↗</span><span><strong>Allenamento guidato</strong><small>Avvia il coach personale</small></span><span class="studio-action-arrow">↗</span></button><button class="studio-action" onclick="road21.openRoutes('+km+')"><span class="studio-action-icon">⌁</span><span><strong>Trova un percorso</strong><small>Proposta di circa '+km.toFixed(1)+' km</small></span><span class="studio-action-arrow">↗</span></button><button class="studio-action" onclick="tab(\'log\')"><span class="studio-action-icon">＋</span><span><strong>Aggiungi attività</strong><small>Registra una nuova sessione</small></span><span class="studio-action-arrow">↗</span></button>';
 const trend=document.createElement('section');trend.className='studio-trend';trend.setAttribute('aria-label','Attività registrata negli ultimi sette giorni della settimana corrente');trend.innerHTML='<div class="studio-trend-head"><div><span class="studio-kicker">LA TUA SETTIMANA</span><h3>Il ritmo che costruisci.</h3></div><div class="studio-trend-total"><strong>'+summary.total+'</strong><span>minuti registrati</span></div></div><div class="studio-bars">'+summary.series.map((b,i)=>'<div class="studio-bar-column"><div class="studio-bar-track"><div class="studio-bar-fill '+(i===day?'is-today':'')+'" style="height:'+(b.minutes?Math.max(7,Math.round(b.minutes/max*100)):0)+'%"></div></div><span>'+['L','M','M','G','V','S','D'][i]+'</span></div>').join('')+'</div><p class="studio-footnote">'+summary.active+' giorni con attività registrata questa settimana. I dati provengono esclusivamente dal diario locale.</p>';
 const overview=root.querySelector('.premium-overview');if(overview)overview.after(heading,grid,trend);else root.prepend(heading,grid,trend);
}
home=function(){base();renderStudio()};
window.roadStudio={weekSeries,getSummary};
})();
