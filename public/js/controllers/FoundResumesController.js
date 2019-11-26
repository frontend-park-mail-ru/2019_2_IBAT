import { FoundResumesView } from '../views/FoundResumes/FoundResumesView';
import { Controller } from '../modules/controller';
import { ACTIONS, RESUME } from '../modules/events';

export class FoundResumesController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._view = new FoundResumesView(this._root, this._globalEventBus);

    this._globalEventBus.subscribeToEvent(ACTIONS.changeRequest, _=>{
      this._router.back();
    });
  }

  openWithData (resumes = {}) {
    this._view.render(resumes);
  }
}