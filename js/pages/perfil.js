

$("#perfil_email").html(getUser().email);
$("#perfil_telefone").html(getUser().phone);
$("#perfil_profissao").html(getUser().work);

let add = getUser().address
$("#perfil_endereco").html(add.street||'' +', ' + add.number||'' + ', ' + add.city||'' + ' - ' + add.state||'');

$("#empresa_cidade").html(add.city + ' - ' + add.state);


console.log('User ', getUser())

if(getUser().profilePicture.link ) {$("#profile_picture").attr("src", getUser().profilePicture.link );}

