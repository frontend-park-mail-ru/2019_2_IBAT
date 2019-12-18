import Component from "../../framework/Component";
import {CHAT} from "../../modules/events";
import Chats from "./Chats";
import ListModel from "../../models/ListModel";
import ItemModel from "../../models/ItemModel";
import ChatRoom from "./ChatRoom";
import {chat_configs, MODES} from "../../modules/chatConfig";

export class ChatApp extends Component {

    constructor(private globalEventBus: any) {
        super();
    }

    model = new ListModel(this.globalEventBus);

    render(): string {
        return `<div class="chat">
                    <div class="chat__list list"></div>
                    <div class="chat__room"></div>
        		</div>`;
    }

    get chatsElement() {
        return this.domElement.querySelector('.chat__list');
    }

    get chatElement() {
        return this.domElement.querySelector('.chat__room');
    }

    onRender() {
        const {domElement} = this;

        domElement.addEventListener(CHAT.openChat, this.handleOpen);
        // domElement.addEventListener(CHAT.openFirstChat, this.handleOpenFirst);

        this.showChats();
    }

    handleOpen = ({detail}) => {
        this.showChat(detail)
    };

    handleOpenFirst = () => {
        // //включать первый чат по списку(или в локалсторадже запоминать тот на котором остановились)
        // if(this.model.list.length){
        //     //Открыть по дефолту первый чат
        //     this.showChat(this.model.list[0]);
        // }
    };

    showChats() {
        this.model.loadChats();

        const chats = new Chats({
            model: this.model
        });

        chats.renderTo(this.chatsElement);
    }

    showChat(model: ItemModel) {

        this.model.list.forEach(chat=>{
            chat_configs.setMode({chat_id: chat.item.chat_id, mode: MODES.notification});

        });

        model.loadChatHistory();

        if(!model.isListening){
            model.listenMessages();
            model.isListening=true;
        }

        const chat = new ChatRoom({model});

        chat.renderTo(this.chatElement);
    }
}
