import { ResumePageView } from '../views/ResumePage/ResumePageView';
import { Controller } from '../modules/controller';
import { RESUME } from '../modules/events';

export class ResumePageController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._view = new ResumePageView(this._root, this._globalEventBus);
    this._globalEventBus.subscribeToEvent(RESUME.deleteResumeSuccess, () => {
      this._router.back();
    } )
  }
}
