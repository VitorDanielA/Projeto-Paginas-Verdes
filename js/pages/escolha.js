const modoDaltonismoAtivado = localStorage.getItem('daltonismo');
const navBar = document.getElementById("nav_cor");
const footer = document.getElementById("footer");
const btnVoltar = document.getElementById("btnVoltar");
const btnSelecionar1 = document.getElementById("btnSelecionar1");
const btnSelecionar2 = document.getElementById("btnSelecionar2");
const legendaUsuarios1 = document.getElementById("legendaUsuarios1");
const legendaUsuarios2 = document.getElementById("legendaUsuarios2");

if(modoDaltonismoAtivado === 'ativado'){
    navBar.classList.add("corPadrao");
    footer.classList.add("corPadrao");
    btnVoltar.classList.add("corBotao");
    btnSelecionar1.classList.add("corBotao");
    btnSelecionar2.classList.add("corBotao");
    legendaUsuarios1.classList.add("corLegenda");
    legendaUsuarios2.classList.add("corLegenda");
}