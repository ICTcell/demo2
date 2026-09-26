document.getElementById('year').textContent = new Date().getFullYear();

// theme toggle
const root=document.documentElement, themeBtn=document.getElementById('themeBtn');
function setTheme(t){root.setAttribute('data-theme',t);themeBtn.innerHTML=t==='dark'?'<i class="fa-solid fa-sun"></i>':'<i class="fa-solid fa-moon"></i>';}
setTheme(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
themeBtn.onclick=()=>setTheme(root.getAttribute('data-theme')==='dark'?'light':'dark');

// nav toggle (mobile)
const navToggle=document.getElementById('navToggle'), navlinks=document.getElementById('navlinks');
navToggle.onclick=()=>navlinks.classList.toggle('open');
navlinks.querySelectorAll('a').forEach(a=>a.onclick=()=>navlinks.classList.remove('open'));

// scroll progress + back to top
const progress=document.getElementById('progress'), backTop=document.getElementById('backTop');
window.addEventListener('scroll',()=>{
  const h=document.documentElement;
  const pct=(h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
  progress.style.width=pct+'%';
  backTop.classList.toggle('show',h.scrollTop>500);
});
backTop.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});

// active nav link on scroll
const sections=document.querySelectorAll('section[id]');
window.addEventListener('scroll',()=>{
  let cur='';
  sections.forEach(s=>{if(scrollY>=s.offsetTop-100)cur=s.id;});
  document.querySelectorAll('.navlinks a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
});

// typing effect
const roles=['Assistant Professor','AI & Data Mining Researcher','Manager, ICT Cell'];
let ri=0,ci=0,deleting=false;
const typedEl=document.getElementById('typed');
function tick(){
  const word=roles[ri];
  typedEl.textContent=deleting?word.slice(0,ci--):word.slice(0,ci++);
  if(!deleting&&ci>word.length){deleting=true;setTimeout(tick,1200);return;}
  if(deleting&&ci<0){deleting=false;ri=(ri+1)%roles.length;}
  setTimeout(tick,deleting?40:80);
}
tick();

// reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in');}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// animated counters
const counters=document.querySelectorAll('[data-count]');
const cio=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){
    const el=e.target,target=+el.dataset.count;let cur=0;
    const step=Math.max(1,Math.ceil(target/40));
    const iv=setInterval(()=>{cur+=step;if(cur>=target){cur=target;clearInterval(iv);}el.textContent=cur;},30);
    cio.unobserve(el);
  }
}),{threshold:.5});
counters.forEach(c=>cio.observe(c));
