/* Road to 21K — immersive workout and route experiences. */
(function(){
'use strict';
const originalGuided=guided;
function enhanceGuided(){
 const root=document.getElementById('view'),card=root?.querySelector('.card');if(!card||!root.querySelector('#guideClock'))return;
 root.classList.add('experience-active');
 card.classList.add('experience-workout');
 const clock=root.querySelector('#guideClock'),phase=clock?.closest('.session');
 if(!phase)return;
 phase.classList.add('experience-phase');
 const session=schedule(guideWeek)[selectedGuide],step=session.steps[guideIndex];
 const total=Math.max(1,step.min*60),progress=Math.min(100,Math.max(0,Math.round(guideSeconds/total*100)));
 const head=document.createElement('div');head.className='experience-head';head.innerHTML='<span>SESSIONE GUIDATA</span><span>FASE '+(guideIndex+1)+' / '+session.steps.length+'</span>';
 phase.prepend(head);
 const ring=document.createElement('div');ring.className='experience-ring';ring.style.setProperty('--progress',progress+'%');clock.before(ring);ring.appendChild(clock);
 const bar=document.createElement('div');bar.className='experience-progress';bar.innerHTML='<span style="width:'+progress+'%"></span>';ring.after(bar);
 const hint=document.createElement('p');hint.className='experience-hint';hint.textContent=guideTimer?'Allenamento in corso · mantieni un ritmo confortevole':'Pronto quando vuoi · avvia il timer per iniziare';bar.after(hint);
 let buttons=phase.querySelectorAll('button');buttons.forEach((b,i)=>b.classList.add(i===0?'experience-start':'experience-next'));
}
guided=function(){originalGuided();enhanceGuided()};
const originalPlan=plan;
function decorateAdvancedPlan(){const root=document.getElementById('view');if(!root)return;root.classList.remove('experience-active');let cards=[...root.querySelectorAll(':scope > .card')];if(!cards.length)return;cards[0].classList.add('experience-plan-control');for(let i=1;i<cards.length;i++){let card=cards[i];card.classList.add('experience-plan-day');let button=card.querySelector('button[onclick*="openGuide"]');if(button){button.classList.add('experience-plan-launch');button.textContent='Inizia →'}let label=card.querySelector('label');if(label)label.classList.add('experience-plan-check')}}
plan=function(){originalPlan();decorateAdvancedPlan()};
const oldAdvanced=window.road21.plan;
window.road21.plan=function(w){oldAdvanced(w);decorateAdvancedPlan()};
const oldRoutes=window.roadRoutes.page;
window.roadRoutes.page=function(){document.getElementById('view')?.classList.remove('experience-active');oldRoutes();let root=document.getElementById('view');root?.classList.add('experience-routes');root?.querySelector('.editorial-screen-heading')?.classList.add('experience-route-head')};
const oldChoose=window.roadRoutes.choose;
window.roadRoutes.choose=function(i){oldChoose(i);let map=document.getElementById('routeMap');if(map)map.classList.add('experience-route-map');document.getElementById('routeDetail')?.querySelector('.card')?.classList.add('experience-route-card')};
const originalTab=tab;
tab=function(t){document.getElementById('view')?.classList.remove('experience-active','experience-routes');originalTab(t)};
})();
