const loggedId = getParameterFromUrl('id')
get('user/find/'+loggedId).then(user=>{
    console.log('user ', user)
    updateScreen(user);

}).catch(error=>{
console.log('error ', error)
    showToast("Erro ao buscar!", error, "danger", "bi bi-bug-fill");

})

function updateScreen(user){
    $(".nome_profissional").html(user.name)
    $(".profissao_profissional").html(user.work)
    if( user.profilePicture)
        $("#profissional_imagem").attr("src", user.profilePicture.link );
    // $(".descricao_profissional").html(user.description.substring(0, 50))
}

function gotoChat() {
//aqui irá o id do profissional selecionado
let otherid = loggedId;
console.log('Other id ', otherid);

let chatLoc = "chat.html";

if(getUser().id == otherid){
    showToast("Erro!", 'Você não pode iniciar um chat consigo mesmo', "danger", "bi bi-person-hearts");
}else{
    get("chatbetween/find/user/" + getUser().id + "/" + otherid)
        .then((cb) => {
        if (cb.id) {
            window.location.href = chatLoc;
        } else {
            //criar chat bet
            post("chatbetween/save", {
            userOne: { id: getUser().id },
            userTwo: { id: otherid },
            })
            .then((created) => {
                if (created.id) {
                window.location.href = chatLoc;
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
        }
        })
        .catch((error) => {
        console.log("error", error);
        });
    }
}

const modoDaltonismoAtivado = localStorage.getItem('daltonismo');
const navBar = document.getElementById("nav_cor");
const containerInfo = document.getElementById("containerInfo");
const btnTermos = document.getElementById("btnTermos");
const btnPerfil = document.getElementById("btnPerfil");
const textoAvaliacao = document.getElementById("textoAvaliacao");
const botaoContratar = document.getElementById("botaoContratar");
const botaoChat = document.getElementById("botaoChat");
const botaoTermos = document.getElementById("botaoTermos");
const btnAvaliar = document.getElementById("btnAvaliar");
var botoesFecharModal = document.querySelectorAll("#btnFecharModal");
var botao1 = botoesFecharModal[0];
var botao2 = botoesFecharModal[1];
var botao3 = botoesFecharModal[2];


if(modoDaltonismoAtivado === 'ativado'){
    navBar.classList.add("corPadrao");
    containerInfo.classList.add("corBackground");
    btnPerfil.classList.add("corPadrao");
    btnTermos.classList.add("corPadrao");
    textoAvaliacao.classList.add("corTexto");
    botaoChat.classList.add("corBotoes");
    botaoContratar.classList.add("corBotoes");
    botaoTermos.classList.add("corBotoes");
    btnAvaliar.classList.add("corPadrao");
    botao1.classList.add("corPadrao");
    botao2.classList.add("corPadrao");
    botao3.classList.add("corPadrao");
}