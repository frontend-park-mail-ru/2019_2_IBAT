import { HeaderView } from '../views/Header/HeaderView';
import { Controller } from '../modules/controller';

export class HeaderController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);
    this._view = new HeaderView(this._root, this._globalEventBus);
  }
}
