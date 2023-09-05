

const basePath = '/saude-front'

 { basePath }

const errorMessage = (m)=>{
    console.log('Error', m)
}

 function validateUser(){
    let user = localStorage.getItem('logged_user')
    if(user == null || user == undefined){
        errorMessage("Por Favor, faça login para acessar a página")
        window.location.href = basePath+"/"
    }
}

 function setUser(user){
    localStorage.setItem('logged_user', JSON.stringify(user))
}

 function getUser(){
    var usr = JSON.parse(localStorage.getItem('logged_user'))
    return usr ? usr:{} 
}


 function logOut(){
    localStorage.removeItem('logged_user')
    window.location.href = basePath+"/"
}