import { Controller } from '../modules/controller';
import { OfflineView } from '../views/Offline/OfflineView';

export class OfflinePageController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);
    this._view = new OfflineView(this._root, this._globalEventBus);
  }
}
