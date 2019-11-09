import { View } from "./view";
import { Router } from "./router";
import { EventBus } from "./eventbus";

export class Controller {
    private readonly _model: any;
    private _view: View;
    
    private readonly _globalEventBus: EventBus;
    private readonly _root: HTMLElement;
    private readonly _router: Router;

    constructor (root: HTMLElement, globalEventBus:  EventBus, router: Router) {
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