import { ResumePageView } from '../views/ResumePage/ResumePageView';
import { Controller } from '../modules/controller';

export class ResumePageController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._view = new ResumePageView(this._root, this._globalEventBus);
  }
}
