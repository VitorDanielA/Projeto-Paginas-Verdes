

const atualizacoes = $('.atualizacoes')
// toggleLoader(true)
get('serviceOffering/all').then(serviceOfferings=>{

    atualizacoes.html('')

    serviceOfferings.forEach((serviceOffering, index) => {
        criarDivProissional(serviceOffering, index, atualizacoes)
    });

}).catch(error=>{
    showToast("Erro ao buscar!", error, "danger", "bi bi-bug-fill");

}).finally(()=>{
  toggleLoader(false)
})



function criarDivProissional(serviceOffering, i, el){

    el.append(
            `
            <div class="media text-muted pt-3 profissional" style="flex-direction: column;">
              <div class="user_info" style="display: flex;height: fit-content;">
                <img
                  class="mr-2 rounded"
                  src="${serviceOffering.worker.profilePicture ? serviceOffering.worker.profilePicture.link:'assets/pexels-andrea-piacquadio-3779705.jpg'}"
                  style="height:70px;width: 70px;object-fit: cover;border-radius:50%;"
                  data-holder-rendered="true"
                />
                <div>
                  <strong class="d-block text-gray-dark mt-2">${serviceOffering.worker.name}</strong>
                  <strong class="d-block text-gray-dark mt-2">${serviceOffering.name}</strong>
                  <strong class="d-block text-gray-dark mb-1">${serviceOffering.worker.work}</strong>
                </div>
                <div>
                  <div id="rating_${serviceOffering.worker.id}"></div>
                </div>
              </div>
              
              <div>
                
                <div class="conteudo">
                  <div id="carroussel${i}" class="carousel slide" data-ride="carousel">
                    
                    <!-- Slides -->
                    <div class="carousel-inner">
                        <!-- 
                        <div class="carousel-item">
                            <img src="assets/pexels-trần-hồng-công-10383580.jpg" alt="Imagem 3">
                        </div>-->
                    </div>
                    
                    <!-- Controles de navegação -->
                    <a class="carousel-control-prev" href="#carroussel${i}" data-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </a>
                    <a class="carousel-control-next" href="#carroussel${i}" data-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </a>
                </div>
                <p class="media-body pb-3 mb-0 small border-bottom border-gray">
                  ${serviceOffering.description}
                <br />
                <a
                  href="contrato.html?id=${serviceOffering.worker.id}"
                  class="btn mt-2 botao"
                  style="flex-wrap: wrap"
                  ><i class="bi bi-person-fill icone nome_navbar"></i> Perfil</a
                >
              </p>
                
              </div>
            </div>
            `
    )

    let carroussel = $("#carroussel"+i+" .carousel-inner")

    serviceOffering.files.forEach((file, index) => {
      if(index === 0){
        carroussel.append(`<div class="carousel-item active">
            <img src="${file.link}" alt="${file.name}">
        </div>`);
      }else{
          carroussel.append(`<div class="carousel-item">
          <img src="${file.link}" alt="${file.name}">
      </div>`);
      }
      
    });

    createStar(()=>{}, `rating_${serviceOffering.worker.id}`, 20, 'orange', false, serviceOffering.worker.ratingAverage || 1)

    return;
    return (
        `
        <div class="media text-muted pt-3 profissional">
            <img
              class="mr-2 rounded"
              src="${serviceOffering.worker.profilePicture ? serviceOffering.worker.profilePicture.link:'assets/pexels-andrea-piacquadio-3779705.jpg'}" style="height:100px;width: 100px;object-fit: cover;"  
              data-holder-rendered="true"
            />
            <p class="media-body pb-3 mb-0 small border-bottom border-gray">
              <strong class="d-block text-gray-dark mt-2">${serviceOffering.name}</strong>
              <strong class="d-block text-gray-dark mt-2">@${serviceOffering.worker.login}</strong>

              <strong class="d-block text-gray-dark mb-1">${serviceOffering.worker.work}</strong>
              ${serviceOffering.description}
              <br />
              <a
                href="contrato.html?id=${serviceOffering.worker.id}"
                class="btn mt-2 botao"
                style="flex-wrap: wrap"
                ><i class="bi bi-person-fill icone"></i> Perfil</a
              >
            </p>
          </div>
    
        
        `
    )
}