

const atualizacoes = $('.atualizacoes')

get('user/workers/all').then(users=>{
    console.log('users ', users)

    atualizacoes.html('')

    users.forEach(user => {
        atualizacoes.append(criarDivProissional(user))
    });

}).catch(error=>{
    showToast("Erro ao buscar!", error, "danger", "bi bi-bug-fill");

})



function criarDivProissional(user){
    return (
        `
        <div class="media text-muted pt-3 profissional">
            <img
              class="mr-2 rounded"
              src="${user.profilePicture ? user.profilePicture.link:'assets/pexels-andrea-piacquadio-3779705.jpg'}" style="height:100px;width: 100px;object-fit: cover;"  
              data-holder-rendered="true"
            />
            <p class="media-body pb-3 mb-0 small border-bottom border-gray">
              <strong class="d-block text-gray-dark mt-2">@${user.login}</strong>

              <strong class="d-block text-gray-dark mb-1">${user.work}</strong>
              ${user.description}
              <br />
              <a
                href="contrato.html?id=${user.id}"
                class="btn mt-2 botao"
                style="flex-wrap: wrap"
                ><i class="bi bi-person-fill icone"></i> Perfil</a
              >
            </p>
          </div>
    
        
        `
    )
}