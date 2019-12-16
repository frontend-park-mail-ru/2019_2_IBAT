import ItemModel from './ItemModel';
import {CHAT} from "../modules/events";

export default class ListModel {
    constructor(globalEventBus: any) {
        globalEventBus.subscribeToEvent(CHAT.getChatsSuccess, (chats) => {
            chats.forEach(chat => {
                this.addItem(ItemModel.load(this, chat, globalEventBus));
            });
            this.triggerUpdate();
        });

        this.load(globalEventBus);
    }


    list: ItemModel[] = [];

    [Symbol.iterator]() {
        return this.getNext()
    }

    * getNext() {
        yield* this.list;
    }

    get length() {
        return this.list.length;
    }

    handlers: (() => void)[] = [];

    getById(id): ItemModel {
        return this.list.find(item => item.id === id);
    }

    onUpdate(callback: () => void) {
        this.handlers.push(callback);
    }

    addItem(item: ItemModel) {
        const {list} = this;

        list.push(item);

        this.save();

        this.triggerUpdate();
    }

    triggerUpdate() {
        const {handlers} = this;

        for (const handler of handlers) {
            handler();
        }
    }

    save() {
        localStorage.setItem('model_list', JSON.stringify(
            this.list.map(({id}) => id)
        ));
    }

    load(globalEventBus){
        globalEventBus.triggerEvent(CHAT.getChats);
    }
}
