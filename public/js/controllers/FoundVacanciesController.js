import { FoundVacanciesView } from '../views/FoundVacancies/FoundVacanciesView';
import { Controller } from '../modules/controller';
import { ACTIONS, VACANCY } from '../modules/events';

export class FoundVacanciesController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._view = new FoundVacanciesView(this._root, this._globalEventBus);

    this._globalEventBus.subscribeToEvent(ACTIONS.changeRequest, _=>{
      this._router.back();
    });
  }

  openWithData (vacancies = {}) {
    this._view.render(vacancies);
  }
}