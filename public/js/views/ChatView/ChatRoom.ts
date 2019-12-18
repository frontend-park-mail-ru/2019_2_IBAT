import Component from '../../framework/Component';
import ItemModel from '../../models/ItemModel';
import {chat_configs, MODES} from "../../modules/chatConfig";
import Message from "../../models/MessageModel";

class ChatRoomOptions {
    model: ItemModel;
}

export default class ChatRoom extends Component {

    constructor(private options: ChatRoomOptions) {
        super();

        window.onpopstate = _ => {
            if (!window.location.pathname.match('/chat')) {
                chat_configs.setMode({chat_id: options.model.item.chat_id, mode: MODES.notification});
            }
        }
    }

    render(): string {
        const {chat_id, companion_id, companion_name, messages} = this.options.model.item;

        const rows = messages ? messages.map(({is_not_yours, content, created_at}) =>
            (this.createMessageComponent({is_not_yours, content, created_at}) as HTMLElement)
                .outerHTML
        ) : null;

        //TODO ТОП 10 МЕГАКОСТЫЛЕЙ ГОДА. Уберите детей от экранов!
        //TODO ПРОБЛЕМА РЕШАЕТСЯ ПРОСТО. ПОДЕЛИТЬ НА ДВЕ КОМПОНЕНТЫ (ROOM_CONTENT, которая будет отрисовываться, при этом не трогая SEND_BAR)
        let inputOldValue='';
        if(this.domElement&&this.domElement.querySelector('.chat__input')){
            inputOldValue=this.domElement.querySelector('.chat__input').value;
        }

        return `<div class="chat__room-wrapper">
                    <h2>
                        <a class="link_list-item" href="/employer/${companion_id}">${companion_name}</a>
                    </h2> 
                    <div class="chat__content">
                        ${rows.length !== 0 ? rows.join('') : `
                            <div>Сообщений с данным пользователем нет</div>
                        `}
                    </div>			
                    <form class="chat__row js-message-form">
                        <input class="input chat__input" value="${inputOldValue}" name="input"/>
                        <input type="submit" value="Отправить" class="button"/>
                    </form>
                </div>
               `;
    }

    get messageForm() {
        return this.domElement.querySelector('.js-message-form');
    }

    get chat() {
        return this.domElement.querySelector('.chat__content');
    }

    onFirstRender() {
        // autoBind(domElement, options.model);
        const {model} = this.options;
        model.onUpdate(() => this.update());
    }

    onRender() {
        this.messageForm.onsubmit = this.handleSubmit.bind(this);
        this.chat.scrollTop = this.chat.scrollHeight;

        this.domElement.querySelector('.chat__input').focus();

        chat_configs.setMode({chat_id: this.options.model.item.chat_id, mode: MODES.chat});
    }

    handleSubmit = (ev) => {
        ev.preventDefault();

        const {options} = this;
        const {model} = options;

        const content = ev.target.input.value;

        const message = {
            is_not_yours: false,
            content,
            created_at: new Date(),
        };

        const messageElement = this.createMessageComponent(message);
        this.chat.appendChild(messageElement);

        model.send(message);
        ev.target.input.value = '';
        this.chat.scrollTop = this.chat.scrollHeight;

    };

    createMessageComponent({is_not_yours, content, created_at}): ChildNode {
        const timestampString = created_at.toLocaleString();

        const htmlString = `<div class="message ${is_not_yours ? 'message_other' : 'message_my'}">
                                <span data-bind="content" class="span__message"></span>
                                <span data-bind="created_at" class="timestamp__message"></span>
                            </div>`;
        const div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        div.querySelector('.span__message').innerHTML = content;
        div.querySelector('.timestamp__message').innerHTML = timestampString;

        // Change this to div.childNodes to support multiple top-level nodes
        return div.firstChild;
    }
}
