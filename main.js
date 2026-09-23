const nav=document.getElementById('nav'),menu=document.querySelector('.menu'),links=document.querySelector('.nav nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>30));
menu.addEventListener('click',()=>links.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
// V4 People carousel
const memberSlides=[...document.querySelectorAll('.member-slide')];
const memberDots=[...document.querySelectorAll('.member-dots button')];
let memberIndex=0;
function showMember(i){
  if(!memberSlides.length)return;
  memberIndex=(i+memberSlides.length)%memberSlides.length;
  memberSlides.forEach((el,n)=>el.classList.toggle('active',n===memberIndex));
  memberDots.forEach((el,n)=>el.classList.toggle('active',n===memberIndex));
}
document.querySelector('.member-arrow.prev')?.addEventListener('click',()=>showMember(memberIndex-1));
document.querySelector('.member-arrow.next')?.addEventListener('click',()=>showMember(memberIndex+1));
memberDots.forEach((d,i)=>d.addEventListener('click',()=>showMember(i)));

// Profile modal
function closeProfiles(){
  document.querySelectorAll('.profile-modal.open').forEach(m=>{m.classList.remove('open');m.setAttribute('aria-hidden','true')});
  document.body.classList.remove('modal-open');
}
document.querySelectorAll('[data-open-profile]').forEach(btn=>btn.addEventListener('click',()=>{
  const modal=document.getElementById('profile-'+btn.dataset.openProfile);
  if(modal){modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');}
}));
document.querySelectorAll('[data-close-profile]').forEach(btn=>btn.addEventListener('click',closeProfiles));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeProfiles()});


// V6 project video modal
function closeVideoModals(){
  document.querySelectorAll('.video-modal.open').forEach(modal=>{
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    const video=modal.querySelector('video');
    if(video) video.pause();
  });
  document.body.classList.remove('video-modal-open');
}
document.querySelectorAll('[data-open-video]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const modal=document.getElementById(btn.dataset.openVideo);
    if(!modal)return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('video-modal-open');
  });
});
document.querySelectorAll('[data-close-video]').forEach(btn=>{
  btn.addEventListener('click',closeVideoModals);
});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape') closeVideoModals();
});
