import { CreateResumeView } from '../views/CreateResume/CreateResumeView';
import { Controller } from '../modules/controller';
import { RESUME } from '../modules/events';

export class CreateResumeController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._globalEventBus.subscribeToEvent(RESUME.createResumeSuccess, (_) => {
      this._router.redirect('/');
    });

    this._view = new CreateResumeView(this._root, this._globalEventBus);
  }
}
