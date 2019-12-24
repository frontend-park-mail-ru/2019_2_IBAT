import Component from '../../framework/Component';
import ItemModel from '../../models/ItemModel';
import {CHAT} from "../../modules/events";

class ChatContentOptions {
    model: ItemModel;
}

export default class ChatContent extends Component {

    constructor(private options: ChatContentOptions) {
        super();
    }

    render(): string {
        const {messages} = this.options.model.item;

        const rows = messages ? messages.map(({is_not_yours, content, created_at}) =>
            (this.createMessageComponent({is_not_yours, content, created_at}) as HTMLElement)
                .outerHTML
        ) : null;

        return `<div class="chat__room-wrapper">
                    ${rows.length !== 0 ? rows.join('') : `
                        <div>Сообщений с данным пользователем нет</div>
                    `}
                </div>`;
    }

    onFirstRender() {
        const {model} = this.options;
        model.onUpdate(() => this.update());
    }

    onRender() {
        this.domElement.scrollTop = this.domElement.scrollHeight;
    }

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

    handleCreateMessage(message) {
        const messageElement = this.createMessageComponent(message);
        this.domElement.appendChild(messageElement);
    }
}
