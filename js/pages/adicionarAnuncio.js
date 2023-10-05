$('#enviar').on('click', ()=>{
    save();
})

$('#files').on('change', ()=>{
    const imagesContainer = $("#imagesContainer")

    imagesContainer.html('');
    let fileList = $('#files').prop('files')
    console.log(fileList)

    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        imagesContainer.append(`<img src="${ URL.createObjectURL(file)}" alt="${file.name}" style="width: 90px;height: 90px;object-fit: cover;margin: 10px;border-radius: 10px;" />`);
    }
})

      const onButton = document.getElementById("onButton");
      const offButton = document.getElementById("offButton");
      const botao_acess = document.getElementById("botao_acess");
      const navBar = document.getElementById("nav_cor");
      const footer = document.getElementById("footer");
      const enviar = document.getElementById("enviar");
      const btnFalar = document.getElementById("btnFalar");
      const botaoFalar = document.getElementById("botaoFalar");
      const icon_acess = document.getElementById("icon_acess");
      const icone = document.getElementById("icone");
      const modoDaltonismoAtivado = localStorage.getItem('daltonismo');
      var toggler = 0;

      if(modoDaltonismoAtivado == 'ativado'){
        onButton.classList.add("corPadrao");
        botao_acess.classList.add("corPadrao");
        botao_acess.classList.remove("botao_acesss");
        icon_acess.classList.add("fa_color_acess");
        onButton.classList.remove("btn-secondary");
        navBar.classList.add("corPadrao");
        footer.classList.add("corPadrao");
        enviar.classList.add("corPadrao");
        botaoFalar.classList.add("corPadrao");
        icone.classList.add("cor_botao_acess");
        console.log("Ativado");
        localStorage.setItem('daltonismo', 'ativado');
        toggler = 1;
      }
      

      onButton.addEventListener("click", function () {
        if (toggler == 0) {
          onButton.classList.add("corPadrao");
          botao_acess.classList.add("corPadrao");
          botao_acess.classList.remove("botao_acesss");
          icon_acess.classList.add("fa_color_acess");
          onButton.classList.remove("btn-secondary");
          navBar.classList.add("corPadrao");
          footer.classList.add("corPadrao");
          enviar.classList.add("corPadrao");
          botaoFalar.classList.add("corPadrao");
          icone.classList.add("cor_botao_acess");
          console.log("Ativado");
          localStorage.setItem('daltonismo', 'ativado');
          toggler = 1;
        } else {
          botao_acess.classList.add("botao_acesss");
          onButton.classList.remove("corPadrao");
          botao_acess.classList.remove("corPadrao");
          icon_acess.classList.remove("fa_color_acess");
          onButton.classList.remove("corPadrao");
          navBar.classList.remove("corPadrao");
          footer.classList.remove("corPadrao");
          enviar.classList.remove("corPadrao");
          botaoFalar.classList.remove("corPadrao");
          icone.classList.remove("cor_botao_acess");
          console.log("Desativado");
          localStorage.setItem('daltonismo', 'desativado');
          toggler = 0;
        }

        console.log(toggler);
      });

      function playAudio() {
        var audio = document.getElementById("audioPlayer");
        audio.play();
      }



function save(){
    let anuncio = {}

    anuncio.worker = getUser();
    anuncio.name = $('#resultado').val();
    anuncio.description = $('#description').val();
    anuncio.price = $('#price').val();
    anuncio.paymentMethods = $('#payment_m').val();
    anuncio.categories = $('#category').val();

    console.log('Anúncio ', anuncio);
    post('serviceOffering/save', anuncio, $('#files').prop('files')).then(success => {
        console.log('success', success);

        showToast(
            "Salvo com sucesso!",
            `Anúncio ${success.name} salvo com sucesso`,
            "success",
            "bi bi-check-circle-fill"
        );
    }).catch(error => {
        console.log('erro ', error)
        showToast("Erro ao salvar", error, "danger", "bi bi-bug-fill");

    })
}