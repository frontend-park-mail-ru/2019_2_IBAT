import { FoundVacanciesView } from '../views/FoundVacancies/FoundVacanciesView';
import { Controller } from '../modules/controller';
import { VACANCY } from '../modules/events';

export class FoundVacanciesController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._view = new FoundVacanciesView(this._root, this._globalEventBus);
  }

  openWithData (vacancies = {}) {
    this._view.render(vacancies);
  }
}
