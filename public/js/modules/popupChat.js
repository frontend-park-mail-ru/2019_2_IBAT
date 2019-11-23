let chatbuble = document.querySelector('.chatbubble');
chatbuble.addEventListener('click', function(event) {
    if (chatbuble.classList.contains('opened')) {
        chatbuble.classList.remove('opened');
        chatbuble.querySelector('.iframe-chat').style.display = 'none';
    } else {
        chatbuble.classList.add('opened');
        chatbuble.querySelector('.iframe-chat').style.display = 'block';
    }
});
