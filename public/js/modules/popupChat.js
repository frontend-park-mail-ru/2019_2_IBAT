let chatbuble = document.querySelector('.chatbubble');
chatbuble.addEventListener('click', function (event) {
  if (chatbuble.classList.contains('opened')) {
    chatbuble.classList.remove('opened');
    chatbuble.querySelector('.iframe-chat').classList.toggle('iframe-chat_opened');
  } else {
    chatbuble.classList.add('opened');
    chatbuble.querySelector('.iframe-chat').classList.toggle('iframe-chat_opened');
  }
});
