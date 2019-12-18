import ListModel from './ListModel';
import {CHAT} from "../modules/events";
import Message from "./MessageModel";

class Item {
    chat_id: string;
    companion_id: string;
    companion_name: string;
    messages?: Message[];
}

type OnItemChangeCallback = () => void;

export default class ItemModel {

    constructor(private list: ListModel, public item: Item, private globalEventBus: any) {
        this.globalEventBus.subscribeToEvent(CHAT.getChatHistorySuccess, (messages) => {
            if(messages && messages[0].chat_id===item.chat_id){
                this.item.messages=[];
                this.item.messages.push(...messages);
                this.triggerUpdate();
            }
        });
    }

    private _isListening=false;

    get isListening(): boolean {
        return this._isListening;
    }

    set isListening(value: boolean) {
        this._isListening = value;
    }

    get isNew() {
        return this.id === null;
    }

    get id() {
        return this.item.chat_id;
    }

    set id(value: string) {
        this.setValue('chat_id', value);
    }

    get companion_name(): string {
        return this.item.companion_name || '';
    }

    set companion_name(value: string) {
        this.setValue('companion_name', value)
    }

    send({is_not_yours, content, created_at}) {
        const message={
            chat_id: this.id,
            content,
            is_not_yours,
            created_at
        };
        this.item.messages.push(message);
        this.globalEventBus.triggerEvent(CHAT.messageSent, JSON.stringify({chat_id:this.id, content}));
    }


    load() {
        Object.keys(this.item).forEach(key => this.setValue(key as any, this.item[key]));
    }

    listenMessages(){
        this.globalEventBus.subscribeToEvent(CHAT.messageReceived, (message)=>{
            if(message.chat_id===this.item.chat_id){
                this.item.messages.push(message);
                this.triggerUpdate();
            }
        });
    }

    loadChatHistory() {
        this.globalEventBus.triggerEvent(CHAT.getChatHistory, this.id);
    }

    triggerUpdate() {
        const {handlers} = this;

        for (const handler of handlers) {
            handler();
        }
    }

    onUpdate(callback: OnItemChangeCallback) {
        this.handlers.push(callback);
    }

    private handlers: OnItemChangeCallback[] = [];

    private setValue(
        key: keyof Item,
        value: Item[typeof key]
    ) {
        const {item, handlers, isNew, list} = this;

        if (item[key] === value) {
            return;
        }

        // @ts-ignore
        item[key] = value;

        for (const handler of handlers) {
            handler();
        }

        if (!isNew) {
            list.triggerUpdate();
        }
    }

    static load(list: ListModel, chat: Item, globalEventBus: any): ItemModel {
        const model = new ItemModel(
            list,
            {
                chat_id: chat.chat_id,
                companion_name: chat.companion_name,
                companion_id: chat.companion_id,
                messages: []
            },
            globalEventBus);

        model.load();
        return model;
    }


}
