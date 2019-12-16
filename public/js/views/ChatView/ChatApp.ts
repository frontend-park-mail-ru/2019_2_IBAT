import Component from "../../framework/Component";
import {CHAT} from "../../modules/events";
import Chats from "./Chats";
import ListModel from "../../models/ListModel";
import ItemModel from "../../models/ItemModel";
import ChatRoom from "./ChatRoom";

export class ChatApp extends Component {

    constructor(private globalEventBus: any) {
        super();
    }

    model = new ListModel(this.globalEventBus);

    render(): string {
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css');
        link.setAttribute("crossorigin", 'anonymous');
        document.getElementsByTagName("head")[0].appendChild(link);


        return `<div class=".container-fluid p-3">
			<h1>Чаты</h1>
			<div class="row">
				<div class="col-3" data-child="chats"></div>
				<div class="col-9" data-child="chat"></div>
			</div>
		</div>`;
    }

    get chatsElement() {
        return this.domElement.querySelector(
            '[data-child="chats"]'
        );
    }

    get chatElement() {
        return this.domElement.querySelector(
            '[data-child="chat"]'
        );
    }

    onRender() {
        const {domElement} = this;

        domElement.addEventListener(CHAT.openChat, this.handleOpen);

        //включать первый чат по списку(или в локалсторадже запоминать тот на котором остановились)
        this.showChats();
    }

    handleOpen = ({detail}) => {
        this.showChat(detail)
    };

    showChats() {
        this.model.loadChats();

        const chats = new Chats({
            model: this.model
        });

        chats.renderTo(this.chatsElement);
    }

    showChat(model: ItemModel) {

        model.loadChatHistory();
        model.listenMessages();

        const chat = new ChatRoom({model});

        chat.renderTo(this.chatElement);
    }
}
