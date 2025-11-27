// swipe.js — простая логика свайпа для двух страниц
(function(){
let startX = 0;
let currentX = 0;
let dragging = false;
let pagesEl = null;
let currentPage = 0; // 0 or 1


function clamp(v, a, b){ return Math.max(a, Math.min(b, v)); }


function initSwipe(){
pagesEl = document.getElementById('pages');
if (!pagesEl) return;


pagesEl.addEventListener('touchstart', onTouchStart, {passive:true});
pagesEl.addEventListener('touchmove', onTouchMove, {passive:false});
pagesEl.addEventListener('touchend', onTouchEnd);


// mouse support for desktop testing
pagesEl.addEventListener('mousedown', onMouseDown);
window.addEventListener('mouseup', onMouseUp);
window.addEventListener('mousemove', onMouseMove);
}


function updateTransform(x){
pagesEl.style.transform = `translateX(${x}px)`;
}


function showPage(n){
currentPage = clamp(n, 0, 1);
pagesEl.style.transition = 'transform .33s ease';
pagesEl.style.transform = `translateX(-${currentPage * 100}%)`;
setTimeout(()=> pagesEl.style.transition = '', 350);
}


function onTouchStart(e){
if (window.innerWidth >= 720) return; // только для мобильного варианта
dragging = true;
startX = e.touches[0].clientX;
pagesEl.style.transition = '';
}


function onTouchMove(e){
if (!dragging) return;
e.preventDefault();
currentX = e.touches[0].clientX;
const dx = currentX - startX;
const width = pagesEl.clientWidth / 2; // одна страница
const percent = (-currentPage * width + dx) / width * 100;
updateTransform(-currentPage * 100 + dx / width * 100 + '%');
}


function onTouchEnd(e){
if (!dragging) return;
dragging = false;
const dx = (currentX || startX) - startX;
if (Math.abs(dx) > 40){
if (dx < 0) showPage(currentPage + 1);
else showPage(currentPage - 1);
} else {
showPage(currentPage);
}
startX = currentX = 0;
}


// mouse handlers for desktop preview (simulate swipe)
let mouseDown = false;
function onMouseDown(e){
if (window.innerWidth >= 720) return;
mouseDown = true; startX = e.clientX; pagesEl.style.transition = '';
}
function onMouseMove(e){
if (!mouseDown) return;
const dx = e.clientX - startX;
updateTransform(dx + -currentPage * pagesEl.clientWidth/2);
}
function onMouseUp(e){
if (!mouseDown) return; mouseDown = false;
const dx = e.clientX - startX;
if (Math.abs(dx) > 60){
if (dx < 0) showPage(currentPage + 1);
else showPage(currentPage - 1);
} else {
showPage(currentPage);
}
}


window.appSwipe = {
init(){ initSwipe(); },
showPage
}
})();