$(document).ready(function() {
    $('head').append('<script src="https://cdn.jsdelivr.net/npm/@stomp/stompjs@7.0.0/bundles/stomp.umd.min.js"></script> ')
    $('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/emojionearea/3.4.2/emojionearea.min.css"> ')
    $('head').append('<script src="https://cdnjs.cloudflare.com/ajax/libs/emojionearea/3.4.2/emojionearea.min.js"></script> ')
    var showNot = false;

    let chatIcon = `<div class="chat_icon">
                        ${showNot ? '<div class="chat_not"></div>': ''}
                        
                        <span style="font-size: 16px; position: inherit; bottom: 55px;">chatPV</span>
    
                        
                        <i class="shadow p-1 mb-3 bg-body rounded bi bi-chat-fill"></i>
                    </div>
                    `

    let style = `
                <style>
                    .chat_icon {
                        font-size: 45px;
                        position: fixed;
                        bottom: 10px;
                        z-index: 10000;
                        right: 30px;
                    }
                    
                    .chat_not{
                        background-color: red;
                        width: 15px;
                        height: 15px;
                        margin: 0;
                        position: relative;
                        top: 20px;
                        left: 30px;
                        border-radius: 50%;
                    }

                    .chat_icon i{
                        color:#259753;
                    }

                    .chat_content_embeded{
                        width: fit-content;
                        height: fit-content;
                        position: fixed;
                        bottom: 75px;
                        right: 50px;
                        z-index: 10000;
                        display: none;
                    }
                </style>
                `
    $('body').append(style)
    $('body').append(chatIcon)

    let chatDiv = `
                    <div id="chat_content_embeded" class="shadow-lg  bg-body rounded chat_content_embeded">
                        <div id="chat_pv" style="padding-top:0">
                            <div id="toggleContacts" class="btn btn-primary"  style="background-color: #259753; 
                            display: flex;position: fixed;right: 410px;z-index: 1;    border-radius: 50% 30% 50% 50%; width: 40px; height: 40px;justify-content: center;align-items: center;">
                                <i id="contacts_icon_person" class="bi bi-person-lines-fill" style="color: white; font-size: 25px; padding: 0;"></i>
                            </div>
                            <div class="chat_div" style="position: fixed; right: 410px; padding: 10px; background-color: white; border-radius: 10px;">
                            
                                <!-- Início da seção de contatos -->
                            
                                <div class="col-md-3 contacts" style="width: 100%;display: none;">
                                        
                                    <h4 style="color: #259753;">Recentes</h4>
                                    <div class="contacts-list" id="contacts-list">
                                    
                                    </div>
                                </div>
                            </div>

                            <!-- Fim da seção de contatos -->

                            <div class="col-md-9 col-lg-12 chat-content" style="width: 100%;">
                                <div class="text-center mb-3 chat-content-contact" >
                                        <div class="chat-content-contact-pic">
                                            <img src="./assets/pexels-andrea-piacquadio-3779705.jpg" alt="Joan Rodrigues" class="rounded-circle" width="50px" height="50px" style="border: 2px solid #fff;object-fit: cover;" id="takler_image">
                                        </div>
                                        <span class="chat-content-contact-name" id="talker_name">Joan Rodrigues</span>
                                </div>
                                <div class="chat-box" >
                                    
                                    
                                    <!-- <div class="my-chat-message rounded p-3 mb-2">
                                        <div class="avatar d-flex">
                                            <img src="./assets/pexels-caleb-oquendo-7772528.jpg" alt="Voce" class="rounded-circle" >

                                        </div>
                                        <div class="message" >
                                        <strong>Você:</strong>
                                        <p > Olá, temos uma oferta especial de serviços hoje!</p>

                                        <span class="message-details text-muted small">
                                            10:35
                                            
                                            <i class="bi bi-check2-all"></i>
                                        </span>
                                        </div>
                                    </div>

                                    <div class="other-chat-message rounded p-3 mb-2">
                                        <div class="avatar d-flex">
                                            <img src="./assets/pexels-andrea-piacquadio-3779705.jpg" alt="Joan Rodrigues" id="talker" class="rounded-circle" >

                                        </div>
                                        <div class="message" >
                                            <strong>Joan Rodrigues:</strong>
                                            <p> Ótimo! Pode me contar mais sobre a oferta?</p>

                                            <span class="message-details text-muted small">
                                            10:35 
                                                
                                            <i class="bi bi-check2"></i>
                                            </span>
                                        </div>
                                    </div>
                                    -->
                                </div>
                                    <div class="input-group mt-3">
                                
                                        <input autofocus type="text" class="form-control form_focus emoji-picker" placeholder="Digite sua mensagem..." id="mensagem">

                                        <button class="btn botao" type="button" style="background-color: #259753;" id="enviar">
                                        
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                                        </svg>
                                        </button>
                                        
                                    </div>
                                        
                            </div>
                            
                        </div>

                    </div>
                    `

    $('.chat_icon').on('click', ()=>{
        

        console.log('clicked')
        toggleChatEmbeded()

        $("#toggleContacts").on('click', ()=>{
            if($('#contacts_icon_person').length > 0){
                $('#contacts_icon_person').before('<i id="contacts_icon_close" class="bi bi-x" style="color: white; font-size: 25px; padding: 0;"></i>')
                $('#contacts_icon_person').remove()
            }else if($('#contacts_icon_close').length > 0){

                $('#contacts_icon_close').before('<i id="contacts_icon_person" class="bi bi-person-lines-fill" style="color: white; font-size: 25px; padding: 0;"></i>')
                $('#contacts_icon_close').remove()
            }
        })
    
        if (!$('link[href="src/css/chat.css"]').length) {
            // Create a new script element and append it to the body
            $('body').append('<link rel="stylesheet" href="src/css/chat.css">');
        }
        if (!$('script[src="./js/pages/chat.js"]').length) {
            // Create a new script element and append it to the body
            $('body').append('<script src="./js/pages/chat.js"></script>');
        }

    })

    function toggleChatEmbeded(){
        if($('#chat_content_embeded').length > 0){
            // Existe o elemento de chat -> remove
            // $('#chat_content_embeded').remove();
            var display = $("#chat_content_embeded").css("display");
            $('#chat_content_embeded').css("display", display == "none" ? "block":"none");

        }else {
            // Não existe o elemento de chat -> adiciona
            $('.chat_icon').before(chatDiv)

            $('#chat_content_embeded').css("display", "block");


        }
    }
    
    
});