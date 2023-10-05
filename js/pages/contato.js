const modoDaltonismoAtivado = localStorage.getItem('daltonismo');
const body = document.getElementById("body");
const btn_corPadrao = document.getElementById("btn_corPadrao");

if(modoDaltonismoAtivado === 'ativado'){
    body.classList.add("corPadrao");
    btn_corPadrao.classList.add("corBotao");
}