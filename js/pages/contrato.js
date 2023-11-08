const avaliacoes = $('#avaliacoes')
const loggedId = getParameterFromUrl('id')

var newRating = {}

$('#rater_name').html(getUser().name)
let lk = undefined;
if(getUser().profilePicture && getUser().profilePicture.link ){
 lk = getUser().profilePicture.link
}
$('#rater_image').attr('src', lk|| 'assets/tiquinho-soares-do-botafogo-comemora-contra-o-fortaleza-pelo-brasileirao-1686448131563_v2_1920x1279.jpg')

$('#avaliar_btn').on('click', ()=>{
    // send rating
    newRating.comment = $('.ck [role="textbox"] p').html()
    newRating.rated = {id:loggedId}
    newRating.rateScore = newRating.rateScore || 0
    
    console.log('rating ', newRating) 

    toggleLoader(true, '#make_rate')

    post('rating/save', newRating).then(saved => {
        console.log('success', saved);
        saved.createdBy = getUser()
        avaliacoes.append(makeAvaliacao(saved))

        showToast(
            "Salvo com sucesso!",
            `Anúncio salvo com sucesso`,
            "success",
            "bi bi-check-circle-fill"
        );

        $('.ck [role="textbox"] p').html('')
        newRating = {}
        toggleLoader(false)

    }).catch(error => {
        console.log('erro ', error)
        showToast("Erro ao salvar", error, "danger", "bi bi-bug-fill");
        toggleLoader(false)

    })
    
})

get('user/find/'+loggedId).then(user=>{
    updateScreen(user);

}).catch(error=>{
console.log('error ', error)
    showToast("Erro ao buscar!", error, "danger", "bi bi-bug-fill");

})

function updateScreen(user){
    $(".nome_profissional").html(user.name)
    $(".profissao_profissional").html(user.work)
    // $("#rating_avarage_num").html(user.ratingAverage ||0)
    if( user.profilePicture)
        $("#profissional_imagem").attr("src", user.profilePicture.link );
    // $(".descricao_profissional").html(user.description.substring(0, 50))
    createStar({func:(num)=>{ }, elId:'rating_avarage', starSize:50, starColor:'rgb(255, 204, 0)', starNumber:5, edit:false, value:user.ratingAverage ||0})
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

loadAvaliacoes()
function loadAvaliacoes(){
    toggleLoader(true, '#avaliacoes')

    get('rating/find/user/'+loggedId).then(ratings=>{
        console.log('ratings ', ratings)

        
        ratings.forEach(rating => {
            if(rating.createdById == getUser().id){
                rating.createdBy = getUser()
                avaliacoes.prepend(makeAvaliacao(rating))

            }else{
                get('user/find/'+rating.createdById ||'').then(user=>{
                
                    rating.createdBy = user
                    avaliacoes.prepend(makeAvaliacao(rating))
                }).catch(err=>{
                    
                    rating.createdBy = {}
                    avaliacoes.prepend(makeAvaliacao(rating))

                })
            }
            

        });
        toggleLoader(false, '#avaliacoes')

    }).catch(error=>{
    console.log('error ', error)
        showToast("Erro ao buscar!", error, "danger", "bi bi-bug-fill");
        toggleLoader(false, '#avaliacoes')
    
    })
    
}


function makeAvaliacao(rating){
    let link = undefined;
    if(rating.createdBy && rating.createdBy.profilePicture && rating.createdBy.profilePicture.link){
        link = rating.createdBy.profilePicture.link
    }
    return `<div class="card container my-2">
      <div class="card-body">
        <div class="divisor d-flex">
          <div class="image d-flex">
            <img src="${link||'assets/ennervalenciainter.webp'}" width="260px" height="260px">
          </div>
          <div class="rating2" id="rating">
            <div class="star_rating" id="rating_${rating.id}">  </div>
            
            <script>
                createStar({func:()=>{}, elId:'rating_${rating.id}', starSize:25, starColor:'rgb(255, 204, 0)', starNumber:5, edit:false, value:${rating.rateScore || 0}})
            </script>
            
            <h5 class="card-title">${rating.createdBy.name || ''}</h5>
            <h4 class="texto">
            ${rating.comment}</p>
          </div>  
        </div>      
      </div>
    </div>`
}

createStar({func:(num)=>{
    newRating.rateScore = num
}, elId:'rating_new', starSize:25, starColor:'rgb(255, 204, 0)', starNumber:5, edit:true, value:0})

