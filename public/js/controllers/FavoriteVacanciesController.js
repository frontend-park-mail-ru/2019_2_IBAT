import { FavoriteVacanciesView } from '../views/FavoriteVacancies/FavoriteVacanciesView';
import { Controller } from '../modules/controller';
import { VACANCY } from '../modules/events';

export class FavoriteVacanciesController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._view = new FavoriteVacanciesView(this._root, this._globalEventBus);

    this._globalEventBus.subscribeToEvent(VACANCY.getFavoriteSuccess, (vacancies = []) => {
      console.log(vacancies);
      this._vacancies = vacancies;
      this._view.hide();
      this._view.render(this._vacancies);
    });
  }

  openWithData () {
    this._globalEventBus.triggerEvent(VACANCY.getFavorite);
  }
}
