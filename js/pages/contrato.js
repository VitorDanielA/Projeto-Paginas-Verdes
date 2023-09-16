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