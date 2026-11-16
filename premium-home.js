/* Editorial home experience. Existing training logic stays authoritative. */
(function(){
'use strict';
const original=home;
function n(v){return Number.isFinite(+v)?+v:0}
function format(v){return v.toLocaleString('it-IT',{maximumFractionDigits:1})}
home=function(){
 original();
 const root=document.getElementById('view');if(!root)return;
 const week=weeks(),day=(new Date().getDay()+6)%7,session=schedule(week)[day],logs=Array.isArray(db.logs)?db.logs:[],totalMin=logs.reduce((a,l)=>a+n(l.min),0),totalKm=logs.reduce((a,l)=>a+n(l.km),0),completed=logs.length;
 const date=new Intl.DateTimeFormat('it-IT',{weekday:'long',day:'numeric',month:'long'}).format(new Date());
 const progress=Math.round(week/26*100),circumference=2*Math.PI*49;
 const panel=document.createElement('div');panel.className='premium-overview';
 panel.innerHTML='<div class="editorial-intro"><div><div class="eyebrow">IL TUO ALLENAMENTO · '+date.toUpperCase()+'</div><h2>Ogni passo<br><em>conta.</em></h2><p>Costruisci la tua costanza, senza fretta.</p></div><div class="progress-orb" role="img" aria-label="Settimana '+week+' di 26"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="49" stroke="#e4e9e4" stroke-width="7" fill="none"/><circle cx="60" cy="60" r="49" stroke="#28694e" stroke-width="7" fill="none" stroke-linecap="round" stroke-dasharray="'+circumference+'" stroke-dashoffset="'+(circumference*(1-progress/100))+'" transform="rotate(-90 60 60)"/></svg><div><strong>'+week+'</strong><small>di 26</small></div></div></div>'+
 '<div class="section-label"><span>IN SINTESI</span><span>Dal primo allenamento</span></div><div class="premium-metrics"><div><span class="metric-symbol">↗</span><strong>'+format(totalKm)+'</strong><small>km registrati</small></div><div><span class="metric-symbol">◷</span><strong>'+format(totalMin)+'</strong><small>minuti attivi</small></div><div><span class="metric-symbol">✓</span><strong>'+completed+'</strong><small>sessioni</small></div></div>'+
 '<div class="section-label"><span>IL PROGRAMMA</span><span>Settimana '+week+'</span></div>';
 root.prepend(panel);
 const hero=root.querySelector('.hero');if(hero){hero.classList.add('premium-session');hero.querySelector('h2')?.classList.add('premium-session-title');let action=document.createElement('div');action.className='session-topline';action.innerHTML='<span class="session-dot"></span><span>OGGI · '+session.day.toUpperCase()+'</span><span class="session-tag">'+(session.min?'ATTIVITÀ':'RECUPERO')+'</span>';hero.prepend(action)}
 const cards=[...root.querySelectorAll('.card')];const timer=cards.find(x=>x.querySelector('#clock'));if(timer){timer.classList.add('premium-timer');let heading=timer.querySelector('h2');if(heading)heading.textContent='Cronometro';}
 const final=cards.find(x=>x.querySelector('.warn'));if(final)final.classList.add('premium-note');
};
})();
