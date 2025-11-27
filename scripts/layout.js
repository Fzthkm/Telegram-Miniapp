// layout.js — отвечает за переключение мобильного/desktop и подгрузку контента
(function(){
// безопасный доступ к Telegram WebApp (если открыт внутри Telegram)
const TG = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;


function isDesktop() {
// можно подстраиваться под Telegram WebApp.isExpanded, но оно не везде доступно
return window.innerWidth >= 720;
}


function applyLayout() {
const mobile = document.getElementById('mobile-container');
const desktop = document.getElementById('desktop-container');
if (isDesktop()){
mobile.style.display = 'none';
desktop.style.display = 'grid';
} else {
mobile.style.display = 'block';
desktop.style.display = 'none';
}
}


function onResize(){
applyLayout();
}


window.appLayout = {
init(){
applyLayout();
window.addEventListener('resize', onResize);
if (TG && TG.onEvent) {
TG.onEvent('viewportChanged', () => applyLayout());
}
},
isDesktop
}
})();