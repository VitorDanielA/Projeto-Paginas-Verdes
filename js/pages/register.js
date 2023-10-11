

function cadastrar(){
    var newUser = {}
    newUser.name = $("[name='nome_completo']").val()
    newUser.email = $("[name='email']").val()
    newUser.phone = $("[name='telefone']").val()
    newUser.cpf = $("[name='cpf']").val()
    newUser.dateOfBirth = $("[name='data_nascimento']").val()
    newUser.workType = $("[name='trabalho']").val()
    newUser.work = $("[name='profissao']").val()
    newUser.useTermAccepted = $("[name='aceite_termos']").is( ":checked" )

    newUser.login = $("[name='login']").val()
    newUser.password = $("[name='senha']").val()

    newUser.address = {}
    newUser.address.country = 'BR'
    newUser.address.state = $("[name='estado']").val()
    newUser.address.city = $("[name='cidade']").val()
    newUser.address.cep = $("[name='cep']").val()
    newUser.address.street = $("[name='rua']").val()
    newUser.address.neighborhood = $("[name='bairro']").val()
    newUser.address.number = 's/n'

    // newUser.homeAddress = newUser.workAddress;
    // newUser.homeAddress.street = $("[name='rua_pessoal']").val()

    newUser.userType = 'Profissional'

    console.log('user ', newUser)

    post('user/save', newUser).then(success=>{
        console.log('Success ', success)
        showToast(
            "Salvo com sucesso!",
            `Bem vindo ao páginas verdes, ${success.name}!`,
            "success",
            "bi bi-check-circle-fill"
        );
        
        setTimeout(() => {
            window.location.href = 'index.html'
        }, 3000)
    }).catch(error=>{
        console.log('Error' , error)

        // alert('Error' + error)
        showToast("Erro ao salvar", error, "danger", "bi bi-bug-fill");

    })

}