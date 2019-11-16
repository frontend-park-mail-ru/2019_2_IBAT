import { Controller } from '../modules/controller';
import { ChooseResumeView } from '../views/ChooseResume/ChooseResumeView';
import { RESPOND } from '../modules/events';

export class ChooseResumeController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._globalEventBus.subscribeToEvent(RESPOND.respondToVacancySuccess, () => {
      this._router.route({path:'/my_responds', addToHistory: true});
    });

    this._view = new ChooseResumeView(this._root, this._globalEventBus);
  }

}
