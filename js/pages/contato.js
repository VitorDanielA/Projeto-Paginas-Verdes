const modoDaltonismoAtivado = localStorage.getItem('daltonismo');
const body = document.getElementById("body");
const btnEnviar = document.getElementById("btnEnviar");
const btn_corPadrao = document.getElementById("btn_corPadrao");

if(modoDaltonismoAtivado === 'ativado'){
    body.classList.add("corPadrao");
    btnEnviar.classList.add("corBotao");
    btn_corPadrao.classList.add("corBotao");
}