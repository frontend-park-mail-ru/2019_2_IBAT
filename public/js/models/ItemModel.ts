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

    send(value: string) {
        const message={
            chat_id: this.id,
            text: value,
        };
        this.globalEventBus.triggerEvent(CHAT.messageSent, JSON.stringify(message));
    }


    load() {
        Object.keys(this.item).forEach(key => this.setValue(key as any, this.item[key]));
    }

    listenMessages(){
        this.globalEventBus.subscribeToEvent(CHAT.messageReceived, (message)=>{
            this.item.messages.push(message);
            this.triggerUpdate();
        });
    }

    loadChatHistory() {
        this.globalEventBus.triggerEvent(CHAT.getChatHistory, this.id);

        this.globalEventBus.subscribeToEvent(CHAT.getChatHistorySuccess, (messages) => {
            this.item.messages.push(...messages);
            this.triggerUpdate();
        });
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
