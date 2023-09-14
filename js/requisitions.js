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

 async function post(endpoint, body){
    
    try{
        const response = await fetch(HOST+API+endpoint, {method:'POST', headers: headers, body:JSON.stringify(body)})
        
        if (!response.ok) {
            throw await response.text()
        }

        const result = await response.json();
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

 async function uploadFile(endpoint, file, pi) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("parentId", pi);
    
    try {
      const response = await fetch(HOST+API+endpoint, {
        method: "POST",
        body: formData,
        headers:headers
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

function getParameterFromUrl(param){
    var queryString = (window.location.search)
    var searchParams = new URLSearchParams(queryString);
    return searchParams.get(param);
    
}