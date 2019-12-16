import {View} from "./view";
import {Router} from "./router";
import {EventBus} from "./eventbus";

export class Controller {
    protected _view: View;

    protected readonly _globalEventBus: EventBus;
    protected readonly _root: HTMLElement;
    protected readonly _router: Router;

    constructor(root: HTMLElement, globalEventBus: EventBus, router: Router) {
        this._root = root;
        this._globalEventBus = globalEventBus;
        this._router = router;
    }

    openWithData(data = {}) {
        this._view.render(data);
    }

    close() {
        this._view.hide();
    }
}
