var chatsBetween = [];
var userTalking = {};

const stompClient = new StompJs.Client({
  brokerURL:
    "ws://" +
    (window.location.hostname || "localhost") +
    ":8085/gs-guide-websocket",
});

stompClient.onConnect = (frame) => {
  // setConnected(true);
  console.log("Connected: " + frame);

  stompClient.subscribe("/topic/greetings", (greeting) => {
    recive(JSON.parse(greeting.body));
  });
};

stompClient.onWebSocketError = (error) => {
  console.error("Error with websocket", error);
};

$(document).ready(function () {
  connect();
  getAllChatsBetweenMe();

  // Initialize the emoji picker
  $(".emoji-picker").emojioneArea({
    pickerPosition: "top",
    tonesStyle: "bullet",
    events: {
      keyup: function (editor, event) {
        if (event.keyCode === 13) {
          event.preventDefault(); // Prevent the default behavior of Enter key
          handleSendMessage();
        }
      },
    },
  });

  // Bind click event to the "Send" button
  $(".botao").on("click", function () {
    console.log('clicou')
    handleSendMessage();
  });

  $(".emojionearea-editor").on("keydown", function (e) {
    // Check if the pressed key is Enter (key code 13)
    if (e.keyCode === 13) {
      // Prevent the default Enter key behavior (e.g., adding a new line)
      e.preventDefault();

      // Call your custom function (handleSendMessage) here
      handleSendMessage();
    }
  });

  const $contactsList = $(".contacts");
  const $toggleContacts = $("#toggleContacts");

  $toggleContacts.on("click", function () {
    $contactsList.toggle();
  });

  scrollToElement("chat_pv");
});

function handleSendMessage() {
  const messageInput = $("#mensagem");
  const chatBox = $(".chat-box");
  const messageText = $(".emojionearea-editor").html();
  
  if (messageText !== "") {
    publish(messageText);
    createMessageHTML(messageText, "my", getUser());

    // Clear the input value after sending the message

    $(".emojionearea-editor").html("");
  }
}

function createMessageHTML(messageText, clazz, user, currentTime) {
  if (!currentTime) {
    currentTime = new Date().toLocaleTimeString([], {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    currentTime = formatTime(currentTime);
  }
  if(user.id === getUser().id){
    user.name = "Você"
  }

  let htmlmes = `
          <div class="${clazz}-chat-message rounded p-3 mb-2">
              <div class="avatar d-flex">
                  <img src="${
                    (user.profilePicture ? user.profilePicture.link: 0) || "./assets/pexels-caleb-oquendo-7772528.jpg" 
                  }"  width="35px" height="35px" alt="${user.name}" class="rounded-circle" style="object-fit: cover;">
              </div>
              <div class="message">
                  <strong>${user.name}:</strong>
                  <p>${messageText}</p>
                  <span class="message-details text-muted small">
                      ${currentTime}
                      <i class="bi bi-check2"></i>
                  </span>
              </div>
          </div>
      `;

  const chatBox = $(".chat-box");
  chatBox.append(htmlmes);
  chatBox.scrollTop(chatBox.prop("scrollHeight"));
}

function formatTime(arr) {
  if (arr.length < 4) {
    return "Invalid input array";
  }

  const [year, month, day, hour, minute] = arr;

  // Use Intl.DateTimeFormat to format the time
  const formattedTime = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
      month: "2-digit",
      year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(year, month - 1, day, hour, minute));

  return formattedTime;
}

function connect() {
  stompClient.activate();
}

function disconnect() {
  stompClient.deactivate();
  // setConnected(false);
  console.log("Disconnected");
}

function publish(msg) {
  if (msg === undefined || msg == null) {
    return;
  }
  var message = { content: msg };
  console.log("msg ", msg);

  message.sender = getUser();
  message.reciver = userTalking;

  stompClient.publish({
    destination: "/app/hello",
    // aqui vai a mensagem
    body: JSON.stringify(message),
  });
  // executeAudio()
}

function recive(message) {
  console.log(message);

  console.log("User t", userTalking.name);
  if (
    message.reciver.id === getUser().id &&
    message.sender.id === userTalking.id
  ) {
    createMessageHTML(message.content, "other", message.sender);
    executeAudio();
  }
}

function getAllChatsBetweenMe() {
  const contactsbox = $("#contacts-list");
  // toggleLoader(true)
  get("chatbetween/find/user/" + getUser().id)
    .then((chatbetlist) => {
      chatsBetween = chatbetlist;
      userTalking = otherByCB(chatsBetween[0]);

      chatsBetween.forEach((chatbet) => {
        let otherUser = {};
        if (chatbet.userOne.id === getUser().id) {
          // the other user is userTwo
          otherUser = chatbet.userTwo;
        }
        if (chatbet.userTwo.id === getUser().id) {
          // the other user is userOne
          otherUser = chatbet.userOne;
        }

        // console.log("Chat between me and ", otherUser.name);

        let newHtml = createContactHTML(
          otherUser,
          userTalking.id === otherUser.id
        );
        contactsbox.append(newHtml);
      });

      setSelected(userTalking.id);
    })
    .catch((error) => {
      console.log("Error ", error);
    })
}

function createContactHTML(user) {
  return `
            <div class="contact" id="${user.id}" onClick="select(event)">
                <img  src="${
                  (user.profilePicture ? user.profilePicture.link: 0)|| "./assets/pexels-caleb-oquendo-7772528.jpg"
                }" alt="${user.name}" class="rounded-circle" width="50px" height="50px" style="object-fit: cover;">
                ${user.name}
            </div>
      `;
}

function select(event) {
  // Obtém o ID do div clicado
  var clickedId = event.currentTarget.id;

  setSelected(clickedId);
}

function setSelected(clickedId) {
  userTalking = otherByCB(getCBByUserId(clickedId));
  $('#title_chat').html('Chat - '+userTalking.name)
  $("#talker_name").html(userTalking.name);
  $("#takler_image").attr('src', (userTalking.profilePicture ? userTalking.profilePicture.link: './assets/pexels-caleb-oquendo-7772528.jpg'));

  // Remove a classe 'selected' de todos os divs
  $(".contact").removeClass("selected");

  // Adiciona a classe 'selected' apenas ao div clicado
  $("#" + clickedId).addClass("selected");

  //Aqui buscar mensagens do bacno entre userTalking and getUser().id
  const chatBox = $(".chat-box");
      chatBox.html("");
  toggleLoader(true, '.chat-box')  
  get("message/find/all/" + userTalking.id + "/" + getUser().id) .then((messages) => {
      // console.log("Messages", messages);
      

      messages.forEach((message) => {
        let clazz = "other";

        if (message.sender.id === getUser().id) {
          clazz = "my";
        }

        createMessageHTML(
          message.content,
          clazz,
          clazz === "my" ? getUser() : message.sender,
          message.createdAt
        );
      });
      
    }).catch((error) => {
      console.log("Error ", error);
    }).finally(() => {
      toggleLoader(false)
    })
}

function getCBByUserId(id) {
  let sel = chatsBetween.find((el) => {
    return el.userOne.id === id;
  });

  if (sel == null || sel === undefined) {
    sel = chatsBetween.find((el) => {
      return el.userTwo.id === id;
    });
  }

  return sel;
}

function myUserByCB(selectedCB) {
  let selected = {};
  if (selectedCB.userOne.id === getUser().id) {
    selected = selectedCB.userOne;
  } else if (selectedCB.userTwo.id === getUser().id) {
    selected = selectedCB.userTwo;
  }
  return selected;
}
function otherByCB(selectedCB) {
  let selected = {};
  if (selectedCB.userOne.id !== getUser().id) {
    selected = selectedCB.userOne;
  } else if (selectedCB.userTwo.id !== getUser().id) {
    selected = selectedCB.userTwo;
  }
  return selected;
}

function executeAudio() {
  var audioElement = $("#audioElement")[0];
  if (!audioElement.paused) {
    audioElement.pause();
    audioElement.currentTime = 0;
  }

  // Play the audio
  audioElement.play();
}

function scrollToElement(elementId) {
  const $targetElement = $("#" + elementId);
  if ($targetElement.length) {
    $("html, body").animate(
      {
        scrollTop: $targetElement.offset().top,
      },
      "slow"
    ); // Use 'slow' for a smoother scrolling effect
  }
}
