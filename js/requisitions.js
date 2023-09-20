const HOST = 'http://'+(window.location.hostname||'localhost')+':8085/'
// const HOST = 'https://paginasverdes-web.serveo.net/'

const API = 'webservice/'


const headers = {
    'Content-type': 'application/json', 
    'Bypass-Tunnel-Reminder':'true',
    'UserId': getUser().id
}

 async function get(endpoint){
    try{
        const response = await fetch(HOST+API+endpoint, {method:'GET', headers: headers})
        
        if (!response.ok) {
            throw await response.text()
        }

        const result = await response.json();
        return result;
    } catch (error) {
        
        throw error;
    }
}

 async function get_params(endpoint, paramsMap){
    
    let params = Object.entries(paramsMap).map(a => a.join('='));
     try{
        let url = HOST+API+endpoint+'?'+params.join('&')
        console.log('url', url)
         const response = await fetch(url, {method:'GET', headers: headers})
         console.log('fecthed ', response)
        
         if (!response.ok) {
            throw await response.text()
        }

        const result = await response.json();
        return result;
    } catch (error) {
        
        throw error;
    }
}

 async function post(endpoint, body, files){
    
    try{
        const response = await fetch(HOST+API+endpoint, {method:'POST', headers: headers, body:JSON.stringify(body)})
        
        if (!response.ok) {
            throw await response.text()
        }

        const result = await response.json();

        console.log('Result', result)
        if(files){await uploadFiles(files, result.id)}

        return result;
    } catch (error) {
        
        throw error;
    }
}

 async function login_user(login, password) {
    try {
        const response = await fetch(HOST + API + 'user/login', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ "login": login, "password": password })
        });

        if (!response.ok) {
            throw await response.text()
        }

        const result = await response.json();
        return result;
    } catch (error) {
        
        throw error;
    }
}

 async function upload_file(file, pi) {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("parentId", pi);


    const customHeaders = {}
    customHeaders["UserId"] = getUser().id
    try {
        console.log('Header ', customHeaders )
        const response = await fetch(HOST+API+'public/upload', {
            method: "POST",
            body: formData,
            headers:customHeaders 
        });
  
        if (!response.ok) {
            throw await response.text()
        }

        const result = await response.json();
        return result;
    } catch (error) {
        
        throw error;
    }
  }

 async function upload_file_batch(files, pi) {
    console.log('Files ', files)
    const formData = new FormData();
    
    formData.append("files", files);
        
    formData.append("parentId", pi);


    const customHeaders = {}
    customHeaders["UserId"] = getUser().id
    try {
        console.log('Header ', customHeaders )
        const response = await fetch(HOST+API+'public/upload/batch', {
            method: "POST",
            body: formData,
            headers:customHeaders 
        });
  
        if (!response.ok) {
            throw await response.text()
        }

        const result = await response.json();
        return result;
    } catch (error) {
        
        throw error;
    }
  }

  function showToast(title, message, type, bi_icon) {
    let types = ["primary", "secondary", "success", "info", "warning", "danger","light", "dark"]
    
    // Crie um elemento de toast
    var toast = document.createElement('div');
    toast.className = 'toast '+(types.includes(type) ? 'bg-'+type : '');
    toast.style.position = 'absolute';
    toast.style.top = '10%';
    toast.style.left = '50%';
    toast.style.transform = 'translate(-50%, -50%)';
    toast.innerHTML = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
        ${
            title ? 
            `<div class="toast-header">
                <i class="${bi_icon}"></i>
                &nbsp;
                <strong class="mr-auto">${title}</strong>
            </div>`
            :''
        }
        
        <div class="toast-body">
            ${message}
        </div>
    `;

    // Adicione o toast à página
    document.body.appendChild(toast);

    // Inicialize o toast usando o Bootstrap
    var bootstrapToast = new bootstrap.Toast(toast);

    // Mostre o toast
    bootstrapToast.show();
}

function toggleLoader(show) {
    if (show) {
        const spinnerOverlay = `
            <style>
            .spinner-overlay {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 0;
                left: 0;
                bottom:0;
                width: 100vw;
                height: 150vh;
                background-color: rgba(255, 255, 255, 0.5);
                z-index: 9999;
            }

            .spinner-text {
                color: black;
            }
        </style>
            <div class="spinner-overlay">
                <div class="spinner-grow text-primary" role="status"></div>
                <div class="spinner-text">Aguarde...</div>
            </div>
        `;
        
        $('body').append(spinnerOverlay);
       
    } else {
        $('.spinner-overlay').remove();
    }
}

function getParameterFromUrl(param){
    var queryString = (window.location.search)
    var searchParams = new URLSearchParams(queryString);
    return searchParams.get(param);
    
}

async function uploadFiles(files, id){
    let newObj = {};


    if (files instanceof FileList) {
        if(files.length ==  1){
            newObj = await upload_file(files[0], id)
        }else if(files.length > 1){
            for (let i = 0; i < files.length; i++) {
                const file = files[i];

                await upload_file(file, id)
            }

        }
    
    } else if (files instanceof File) {
        newObj = await upload_file(files, id)
    }

    return newObj;
    
}
/*
Usage->
<div id="rating"></div>


var obj = {}
createStar((val)=>{
    console.log("val", val)
    obj.rating = val
}, "rating", 100, 'green', 5, true)

*/
function createStar(func, elId, starSize, starColor, starnumber, edit, predef){
    
    const starElement = $("#"+elId)
    if(!starElement){
      return 0;
    }

    let starss_style = `
      <style>
        #starrr_${elId} .bi-star-fill, #starrr_${elId} .bi-star{
          font-size:${starSize}px;
        }
        #starrr_${elId} .bi-star{
          color:gray
        }
        #starrr_${elId} .bi-star-fill{
          color: ${starColor};
        }
      </style>
    `
    starElement.append(starss_style)
    
    let starss = `
      <div class="starrr" id="starrr_${elId}">
      </div>
    `
    starElement.append(starss)

    let max = starnumber || 5
    for(var i = 0; i < max; i++){
        $("#starrr_"+elId).append(`<i class="star bi bi-star" id="${elId}__star_${i+1}"></i>`)
    }


    let selected_star = predef || 1

    $('#starrr_'+elId+' i.star').each( function( index, element ){
      if(index < selected_star){
        let el = $("#"+element.id)
        el.addClass("bi-star-fill")
        el.removeClass("bi-star")
      }
    });

    if(edit){
        $('#starrr_'+elId+' i.star').on( "click", (e)=>{
        let star_num = parseInt(e.target.id.match(/__star_(\d+)/)[1])
        selected_star = star_num
        console.log('Clicked star',star_num)
        
        
        func(selected_star)
        
      })

      $('#starrr_'+elId+' i.star').on( "mouseenter", (e)=>{
        let star_num = parseInt(e.target.id.match(/__star_(\d+)/)[1])

        $('#starrr_'+elId+' i.star').each( function( index, element ){
          if(index < star_num){
            let el = $("#"+element.id)
            el.addClass("bi-star-fill")
            el.removeClass("bi-star")
          }
          
        });
      } ).on( "mouseleave", (e)=>{
          $('#starrr_'+elId+' i.star').each( function( index, element ){
            if(index >= selected_star){
              let el = $("#"+element.id)
              el.addClass("bi-star")
              el.removeClass("bi-star-fill")
            }
          });
      } );
    }
    

    
  }