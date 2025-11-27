// app.js — glue-код: подгружает страницы, инициализирует layout + swipe
(function(){
async function fetchHtml(path){
const res = await fetch(path);
if (!res.ok) return `<div class="card"><p class="p-muted">Не удалось загрузить ${path}</p></div>`;
return await res.text();
}


async function init(){
// вставляем контент экранов (можешь заменить fetch на inline шаблоны)
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const left = document.getElementById('left');
const right = document.getElementById('right');


page1.innerHTML = await fetchHtml('pages/screen1.html');
page2.innerHTML = await fetchHtml('pages/screen2.html');


left.innerHTML = await fetchHtml('pages/screen1.html');
right.innerHTML = await fetchHtml('pages/screen2.html');


// инициализация layout + swipe
window.appLayout && window.appLayout.init && window.appLayout.init();
window.appSwipe && window.appSwipe.init && window.appSwipe.init();


// тестовая кнопка: показать модалку в первой странице
document.addEventListener('click', (e)=>{
if (e.target && e.target.dataset && e.target.dataset.modal === 'open'){
const bg = document.getElementById('modal-bg');
if (bg) bg.style.display = 'flex';
}
if (e.target && e.target.dataset && e.target.dataset.modal === 'close'){
const bg = document.getElementById('modal-bg');
if (bg) bg.style.display = 'none';
}
})
}


// старт
document.addEventListener('DOMContentLoaded', init);
})();