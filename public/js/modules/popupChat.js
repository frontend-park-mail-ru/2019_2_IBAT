let chatbuble = document.querySelector('.chatbubble');
chatbuble.addEventListener('click', function(event) {
    if (chatbuble.classList.contains('opened')) {
        chatbuble.classList.remove('opened');
        chatbuble.querySelector('.chat').style.display = 'none';
    } else {
        chatbuble.classList.add('opened');
        chatbuble.querySelector('.chat').style.display = 'block';
    }
});