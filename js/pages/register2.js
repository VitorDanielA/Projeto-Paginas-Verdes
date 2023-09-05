

function cadastrar(){
    var newUser = {}
    newUser.name = $("[name='nome_completo']").val()
    newUser.email = $("[name='email']").val()
    newUser.phone = $("[name='telefone']").val()
    newUser.cpf = $("[name='cpf']").val()
    newUser.dateOfBirth = $("[name='data_nascimento']").val()
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


    console.log('user ', newUser)

    post('user/save', newUser).then(success=>{
        console.log('Success ', success)
    }).catch(error=>{
        console.log('Error' , error)
    })

}