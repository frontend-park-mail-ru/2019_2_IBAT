import { Controller } from '../modules/controller';
import { MyRespondsView } from '../views/MyResponds/MyRespondsView';

export class MyRespondsController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._view = new MyRespondsView(this._root, this._globalEventBus);
  }

}
