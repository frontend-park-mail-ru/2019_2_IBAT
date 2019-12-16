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
			<tr data-item-id="${id}">
			  <td data-bind="companion_name"></td>
			</tr>
		`);

        return `<div>
			<table class="table table-hover">
				  <tbody>
					${rows.length ? rows.join('') : `
						<tr>
							<td colspan="1" style="text-align: center">Созданных чатов нет</td>
						</tr>
					`}
				  </tbody>
			</table>
		</div>`;
    }

    handleTrClick = (model: ItemModel) => () => this.triggerEvent(CHAT.openChat, model);

    onRender() {
        const {domElement, options} = this;
        const {model} = options;

        domElement.querySelectorAll('[data-item-id]').forEach((trElement) => {
            const itemId = trElement.getAttribute('data-item-id');
            const itemModel = model.getById(itemId);

            trElement.onclick = this.handleTrClick(itemModel);

            autoBind(trElement, itemModel);
        })
    }

    onFirstRender() {
        const {model} = this.options;
        model.onUpdate(() => this.update());
    }
}
