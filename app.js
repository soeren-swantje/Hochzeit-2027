
const params=new URLSearchParams(location.search);
let group=params.get('gruppe');
if(!['tag','abend'].includes(group)){group=sessionStorage.getItem('hochzeitGruppe')||'abend'}
sessionStorage.setItem('hochzeitGruppe',group);
document.documentElement.dataset.group=group;
document.querySelector('#groupField').value=group==='abend'?'Nachmittag und Abend':'Nur Nachmittag';
document.querySelector('#guestBadge').textContent=group==='abend'?'Eure Einladung: Nachmittag & Abend':'Eure Einladung: Nachmittagsprogramm';
if(group==='tag') document.querySelectorAll('.evening-only').forEach(el=>el.classList.add('hidden-by-group'));
else document.querySelectorAll('.day-only').forEach(el=>el.classList.add('hidden-by-group'));
const menu=document.querySelector('.menu-button'),nav=document.querySelector('#nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
function tick(){const target=new Date('2027-07-24T14:00:00+02:00').getTime(),diff=Math.max(0,target-Date.now());document.querySelector('#days').textContent=Math.floor(diff/86400000);document.querySelector('#hours').textContent=Math.floor(diff/3600000)%24;document.querySelector('#minutes').textContent=Math.floor(diff/60000)%60}tick();setInterval(tick,60000);
