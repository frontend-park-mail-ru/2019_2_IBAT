import { Controller } from '../modules/controller';
import { MyResumesView } from '../views/MyResumes/MyResumesView';

export class MyResumesController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._view = new MyResumesView(this._root, this._globalEventBus);
  }
}
