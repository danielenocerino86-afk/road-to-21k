/* Minimal navigation polish and accessibility */
(function(){
'use strict';
function setActive(){const buttons=[...document.querySelectorAll('nav button')];let active=typeof current==='string'?current:'home';for(const b of buttons){let onclick=b.getAttribute('onclick')||'';let selected=onclick.includes("'"+active+"'");b.classList.toggle('active',selected);if(selected)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')}}
document.querySelector('nav')?.addEventListener('click',()=>requestAnimationFrame(setActive));
setActive();
})();
