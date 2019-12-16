import template from './popupToConfirm.pug';

/**
 * @param {String} title
 * @param {String} question
 * @param {String} yes
 * @param {String} no
 * @returns {Boolean}
 */
function PopupToConfirm(title='', msg='', question='', yes='Ок', no='Отмена') {
    let popup = document.createElement('div');
    popup.innerHTML = template({title, msg, question, yes, no});
    document.body.appendChild(popup);
    let visible = true;

    let modalContainer = document.querySelector('.modal__container');
    let modalOverlay = document.querySelector('.modal__overlay');
    let ok = document.querySelector('.modal_yes');
    let cancel = document.querySelector('.modal_no');


    if (ok && cancel) {
        ok.addEventListener('click', function(event) {
            hide();
            return true;
        }, {once: true});
        cancel.addEventListener('click', function(event) {
            hide();
            return false;
        },{once: true});
    }

    function hide() {
        if (!visible) {
            return;
        }
        modalContainer.classList.remove('.modal__container_visible');
        modalOverlay.classList.remove('.modal__overlay_visible');
    }
}
