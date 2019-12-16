import { VacancyPageView } from '../views/VacancyPage/VacancyPageView';
import { Controller } from '../modules/controller';
import { VACANCY } from '../modules/events';

export class VacancyPageController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._globalEventBus.subscribeToEvent(VACANCY.chooseResume, data => {
      this._router.redirect({ path: '/chooseResume', data, addToHistory: true });
    });

    this._view = new VacancyPageView(this._root, this._globalEventBus);
  }
}
