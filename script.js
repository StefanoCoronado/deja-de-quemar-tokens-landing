(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const copy=async txt=>{try{await navigator.clipboard.writeText(txt)}catch{const t=document.createElement('textarea');t.value=txt;document.body.append(t);t.select();document.execCommand('copy');t.remove()}};

/* Reveal */
const io='IntersectionObserver'in window?new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12}):null;
$$('.reveal').forEach(el=>io?io.observe(el):el.classList.add('in'));

/* Copiar prompts */
$$('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{
  const t=document.getElementById(b.dataset.copy);if(!t)return;
  await copy(t.textContent.trim());
  const o=b.textContent;b.textContent='Copiado ✓';b.classList.add('done');setTimeout(()=>{b.textContent=o;b.classList.remove('done')},1600);
}));

/* Comandos */
$$('[data-cmd]').forEach(b=>b.addEventListener('click',async()=>{
  await copy(b.dataset.cmd);const c=$('code',b),o=c.textContent;c.textContent='Copiado ✓';b.classList.add('done');setTimeout(()=>{c.textContent=o;b.classList.remove('done')},1600);
}));

/* Escena con y sin Graphify */
const cx=$('[data-ctx]');
if(cx){
  const bs=$$('.switch button',cx);let timer=0;
  const set=m=>{cx.dataset.m=m;bs.forEach(b=>b.setAttribute('aria-pressed',b.dataset.m===m))};
  bs.forEach(b=>b.addEventListener('click',()=>{clearInterval(timer);set(b.dataset.m)}));
  if(!calm)timer=setInterval(()=>set(cx.dataset.m==='sin'?'con':'sin'),4500);
}

/* Pestañas */
const tabs=$('[data-tabs]');
const pick=n=>{
  $$('[role=tab]',tabs).forEach((t,i)=>t.setAttribute('aria-selected',i===n));
  $$('[role=tabpanel]',tabs).forEach((p,i)=>p.hidden=i!==n);
};
if(tabs){
  $$('[role=tab]',tabs).forEach((t,i)=>t.addEventListener('click',()=>pick(i)));
  /* Ayudante de Git */
  const h=$('[data-helper]'),out=$('.helper-out',h),tl=$$('[role=tab]',tabs);
  $$('button',h).forEach(b=>b.addEventListener('click',()=>{
    const si=b.dataset.g==='si';
    $$('button',h).forEach(x=>x.setAttribute('aria-pressed',x===b));
    tl.forEach(t=>t.classList.remove('rec'));tl[0].classList.add('rec');tl[si?1:2].classList.add('rec');
    out.innerHTML=si?'Usa el <b>01</b> y después el <b>02</b>.':'Usa el <b>01</b> y después el <b>03 (SAFE)</b>: nunca toca Git.';
    pick(si?1:2);
  }));
}

/* Linterna del fondo */
if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!calm){
  const root=document.documentElement;let raf=0,x=0,y=0;
  addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;if(raf)return;raf=requestAnimationFrame(()=>{root.style.setProperty('--mx',x+'px');root.style.setProperty('--my',y+'px');raf=0})},{passive:true});
  document.addEventListener('pointerleave',()=>{root.style.removeProperty('--mx');root.style.removeProperty('--my')});
}
})();

/* acordeón: un desplegable abierto a la vez por grupo */
document.querySelectorAll("details").forEach(d=>d.addEventListener("toggle",()=>{if(d.open&&d.parentElement)d.parentElement.querySelectorAll(":scope>details[open]").forEach(o=>{if(o!==d)o.open=false})}));
