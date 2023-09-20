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