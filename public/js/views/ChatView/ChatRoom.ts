import Component from '../../framework/Component';
import ItemModel from '../../models/ItemModel';
import {chat_configs, MODES} from "../../modules/chatConfig";
import ChatContent from "./ChatContent";
import {CHAT} from "../../modules/events";

class ChatRoomOptions {
    model: ItemModel;
}

export default class ChatRoom extends Component {

    private chatContent: ChatContent;

    constructor(private options: ChatRoomOptions) {
        super();

        window.onpopstate = _ => {
            if (!window.location.pathname.match('/chat')) {
                chat_configs.setMode({chat_id: options.model.item.chat_id, mode: MODES.notification});
            }
        }
    }

    render(): string {
        const {companion_id, companion_name} = this.options.model.item;

        return `<div class="chat__room-wrapper">
                    <h2>
                        <a class="link_list-item" href="/employer/${companion_id}">${companion_name}</a>
                    </h2> 
                    <div class="chat__content"></div>			
                    <form class="chat__row js-message-form">
                        <input class="input chat__input" name="input"/>
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
    }

    onRender() {
        this.messageForm.onsubmit = this.handleSubmit.bind(this);
        // this.chat.scrollTop = this.chat.scrollHeight;
        this.showChatContent(this.options.model);

        this.domElement.querySelector('.chat__content');
        // this.domElement.querySelector('.chat__input').focus();

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

        this.chatContent.handleCreateMessage(message);

        model.send(message);
        ev.target.input.value = '';
        this.chat.lastChild.scrollTop = this.chat.lastChild.scrollHeight;

    };

    showChatContent(model: ItemModel) {
        this.chatContent = new ChatContent({model});
        this.chatContent.renderTo(this.chat);
    }
}
