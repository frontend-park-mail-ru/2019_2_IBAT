import Component from '../../framework/Component';
import ListModel from '../../models/ListModel';
import {autoBind} from '../../framework/autoBind';
import ItemModel from "../../models/ItemModel";
import {CHAT} from "../../modules/events";

interface ChatsOptions {
    model: ListModel;
}

export default class Chats extends Component {

    constructor(private options: ChatsOptions) {
        super();
    }

    render(): string {
        const {model} = this.options;

        console.log(model);
        const rows = [...model.list].map(({id, companion_name}) => `
	        <div data-item-id="${id}" class="chat__list__item" data-bind="companion_name">${companion_name}</div>
		`);

        return `
            <h2 class="title-h1_semibold">Чаты</h2>
			<div class="chat__list__content">
                ${rows.length ? rows.join('') : `
                    <div style="text-align:center">Созданных чатов нет</div>
                `}
			</div>`;
    }

    handleTrClick = (model: ItemModel) => this.triggerEvent(CHAT.openChat, model);

    onRender() {
        const {domElement, options} = this;
        const {model} = options;

        domElement.querySelectorAll('[data-item-id]').forEach(trElement => {
            const itemId = trElement.getAttribute('data-item-id');
            const itemModel = model.getById(itemId);

            trElement.addEventListener('click', (ev)=>{
                this.handleTrClick(itemModel);
            });

            autoBind(trElement, itemModel);
        });
    }

    onFirstRender() {
        const {model} = this.options;
        model.onUpdate(() => this.update());
    }
}
