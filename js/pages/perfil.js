

$("#perfil_email").html(getUser().email);
$("#perfil_telefone").html(getUser().phone);

let add = getUser().address
$("#perfil_endereco").html(add.street +', ' + add.number + ', ' + add.city + ' - ' + add.state);

$("#empresa_cidade").html('IFBA, ' + add.city + ' - ' + add.state);

