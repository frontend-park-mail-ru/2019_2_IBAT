import { SearchVacancyView } from '../views/SearchVacancy/SearchVacancyView';
import { Controller } from '../modules/controller';
import { VACANCY } from '../modules/events';

export class SearchVacancyController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._globalEventBus.subscribeToEvent(VACANCY.searchSuccess, (url, vacancies = [], parameters) => {
      console.log('searchcontroller', url, vacancies);
      this._router.redirect({path: url, data: vacancies, prevState: parameters});
    });

    this._view = new SearchVacancyView(this._root, this._globalEventBus);
  }
}
