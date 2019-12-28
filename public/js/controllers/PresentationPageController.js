import { Controller } from '../modules/controller';
import { OfflineView } from '../views/Offline/OfflineView';
import { PresentationView } from '../views/Presentation/OfflineView';

export class PresentationPageController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);
    this._view = new PresentationView(this._root, this._globalEventBus);
  }
}
