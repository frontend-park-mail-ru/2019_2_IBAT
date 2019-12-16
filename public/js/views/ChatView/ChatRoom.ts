import Component from '../../framework/Component';
import ItemModel from '../../models/ItemModel';
import {CHAT} from '../../modules/events';

class ChatRoomOptions {
    model: ItemModel;
}

export default class ChatRoom extends Component {

    constructor(private options: ChatRoomOptions) {
        super();
    }

    render(): string {
        const {chat_id, companion_id, companion_name, messages} = this.options.model.item;

        const rows = messages ? messages.map(message =>
            (this.createMessageComponent(message.is_not_yours, message.content, message.created_at) as HTMLElement)
                .outerHTML
        ) : null;

        return `<div class="chat">
				<a href="/employer/${companion_id}">${companion_name}</a> 
				<div class="chat__content">
					${rows ? rows.join('') : `
						<div style="text-align:center">Сообщений с данным пользователем нет</div>
					`}
				</div>			
                <form class="chat__row js-message-form">
                    <input class="input chat__input" name="input"/>
                    <input type="submit" value="Отправить" class="button"/>
                </form>
			</div>`;
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
    }

    handleSubmit = (ev) => {
        ev.preventDefault();

        const {options} = this;
        const {model} = options;

        const text=ev.target.input.value;

        const messageElement = this.createMessageComponent(
            false,
            text,
            new Date()
        );
        this.chat.appendChild(messageElement);

        model.send(text);
        ev.target.input.value = '';
    };

    createMessageComponent(is_not_yours: boolean, content: string, created_at: Date): ChildNode {
        const timestampString = created_at.toLocaleString();

        const htmlString = `<div class="message ${is_not_yours ? 'message_other' : 'message_my'}">
			        <span data-bind="content" class="span__message">${content}</span>
			        <span data-bind="created_at" class="timestamp__message">${timestampString}</span>
            </div>`;
        const div = document.createElement('div');
        div.innerHTML = htmlString.trim();

        // Change this to div.childNodes to support multiple top-level nodes
        return div.firstChild;
    }
}
