

const atualizacoes = $('.atualizacoes')

toggleLoader(true)
atualizacoes.html('')
get('serviceOffering/all').then(serviceOfferings=>{

    atualizacoes.html('')
    
    serviceOfferings.forEach((serviceOffering, index) => {
        criarDivProissional(serviceOffering, index, atualizacoes)
    });
    if(serviceOfferings.length <= 0){
      atualizacoes.append('<p>Nada encontrado</p>')
    }

}).catch(error=>{
    showToast("Erro ao buscar!", error, "danger", "bi bi-bug-fill");

}).finally(()=>{
  toggleLoader(false)
})


const modoDaltonismoAtivado = localStorage.getItem('daltonismo');
const navBar = document.getElementById("nav_cor");
const footer = document.getElementById("footer");
const enviar = document.getElementById("enviar");
const search_input = document.getElementById("searchInput");
const search_input2 = document.getElementById("searchInput2");
const procurar = document.getElementById("procurar");

if(modoDaltonismoAtivado === 'ativado'){
  navBar.classList.add("corPadrao");
  footer.classList.add("corPadrao");
  enviar.classList.add("corBotao");
  search_input.classList.add("searchInputDaltonismo");
  search_input2.classList.add("searchInputDaltonismo");
  procurar.classList.add("corBotao");
}


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
                  <strong class="d-block text-gray-dark ">${serviceOffering.worker.name}</strong>
                  <strong class="d-block text-gray-dark ">${serviceOffering.name}</strong>
                  <strong class="d-block text-gray-dark ">${serviceOffering.worker.work}</strong>
                  <strong class="d-block text-gray-dark ">Preço ${formatReal(serviceOffering.price)}</strong>
                </div>
                
              </div>
              
              <div>
                
                <div class="conteudo">
                  <div id="carroussel${i}" class="carousel slide" data-ride="carousel">
                    
                    <!-- Slides -->
                    <div class="carousel-inner">
                        <div>
                          <div class="star_rating" id="rating_${serviceOffering.id}"> 
                            <span>${serviceOffering.worker.ratingAverage} &nbsp;</span>
                          
                          </div>
                        </div>
                        <script>
                          createStar({func:()=>{}, elId:'rating_${serviceOffering.id}', starSize:20, starColor:'orange', starNumber:5, edit:false, value:${serviceOffering.worker.ratingAverage || 0}})
                        </script>

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
                        <span class="carousel-control-next-icon bg-success"></span>
                    </a>
                </div>
                <p class="media-body pb-3 mb-0 small border-bottom border-gray my-4">
                  ${serviceOffering.description}
                <br />
                <a
                  href="contrato.html?id=${serviceOffering.worker.id}"
                  class="btn mt-3 botao botao_perfil"
                  style="flex-wrap: wrap"
                  ><i class="bi bi-person-fill icone nome_navbar"></i> Perfil</a
                >
                <a
                  href="denunciarAnuncio.html"
                  class="btn mt-3 botao botao_perfil"
                  style="flex-wrap: wrap"
                  ><i class="bi bi-flag icone nome_navbar mb-2"></i> Reportar</a
                >
                </p>
                
              </div>
            </div>

            <script>

            if(modoDaltonismoAtivado === 'ativado'){
              $(document).ready(function() {
                $('.botao_perfil').addClass('corBotao');
              });
            }
            
            </script>
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

$('#procurar').on('click', ()=>{
  updateByFilter()
})
$('#price_filter').on('change', ()=>{
  updateByFilter()
})
$('#rating_filter').on('change', ()=>{
  updateByFilter()
})
$('#rating_filter').on('category_filter', ()=>{
  updateByFilter()
})

function updateByFilter(){
  let maxprice="all"
  let minrating="all"
  let category="all"
  let city="all"
  let work="all"

  maxprice=$('#price_filter').val()
  minrating=$('#rating_filter').val()
  category=$('#category_filter').val()
  city=$('#searchInput2').val() ? $('#searchInput2').val() : 'all'
  work=$('#searchInput').val() ? $('#searchInput').val() : 'all'
  
  // serviceOffering/filter?maxprice=all&minrating=all&category=all&city=all&work=all

  toggleLoader(true)
  atualizacoes.html('')
  get('serviceOffering/filter?maxprice='+maxprice+'&minrating='+minrating+'&category='+category+'&city='+city+'&work='+work).then(serviceOfferings=>{
      atualizacoes.html('')      
      serviceOfferings.forEach((serviceOffering, index) => {
          criarDivProissional(serviceOffering, index, atualizacoes)
      });

      if(serviceOfferings.length <= 0){
        atualizacoes.append('<p>Nada encontrado</p>')
      }

  }).catch(error=>{
      showToast("Erro ao buscar!", error, "danger", "bi bi-bug-fill");

  }).finally(()=>{
    toggleLoader(false)
  })
}

function formatReal(numero) {
  // Verifica se o número é um número válido
  if (isNaN(numero)) {
    return "Número inválido";
  }

  // Formata o número como um valor monetário com 2 casas decimais
  const valorFormatado = numero.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  return valorFormatado;
}