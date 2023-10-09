const modoDaltonismoAtivado = localStorage.getItem('daltonismo');
const navBar = document.getElementById("nav_cor");
const footer = document.getElementById("footer");
const btnEdit = document.getElementById("btn_edit");
const btnExcluir = document.getElementById("btn_excluir");

if(modoDaltonismoAtivado === 'ativado'){
    navBar.classList.add("corPadrao");
    footer.classList.add("corPadrao");
    btnEdit.classList.add("corBotao");
    btnExcluir.classList.add("corBotao");
}

$("#perfil_email").html(getUser().email);
$("#perfil_telefone").html(getUser().phone);
$("#perfil_profissao").html(getUser().work);

let add = getUser().address
$("#perfil_endereco").html(add.street||'' +', ' + add.number||'' + ', ' + add.city||'' + ' - ' + add.state||'');

$("#empresa_cidade").html(add.city + ' - ' + add.state);


console.log('User ', getUser())

if(getUser().profilePicture.link ) {$("#profile_picture").attr("src", getUser().profilePicture.link );}

