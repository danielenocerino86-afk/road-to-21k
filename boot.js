/* Rehydrate initial screen after deferred enhancements are registered. */
(function(){
'use strict';
try{if(typeof render==='function')render();}catch(error){console.error('Road to 21K: initial render failed',error)}
function syncNav(){let currentView=typeof current==='string'?current:'home';document.querySelectorAll('nav button').forEach(button=>{let action=button.getAttribute('onclick')||'',active=action.includes("'"+currentView+"'");button.classList.toggle('active',active);if(active)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current')})}
syncNav();
document.querySelector('nav')?.addEventListener('click',()=>requestAnimationFrame(syncNav));
})();
