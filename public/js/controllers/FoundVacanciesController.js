import { FoundVacanciesView } from '../views/FoundVacancies/FoundVacanciesView';
import { Controller } from '../modules/controller';
import { ACTIONS, VACANCY } from '../modules/events';

export class FoundVacanciesController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);
    this._vacancies = [];
    this._request = '';
    this._view = new FoundVacanciesView(this._root, this._globalEventBus);

    this._globalEventBus.subscribeToEvent(ACTIONS.changeRequest, _=> {
      this._router.back();
    });

    this._globalEventBus.subscribeToEvent(VACANCY.searchSuccess, vacancies => {
      this._vacancies = vacancies;
      this._view.render(this._vacancies);
    })

    this._globalEventBus.subscribeToEvent(VACANCY.searchFailed, _ => {
      this._view.render();
    })
  }
  
  openWithData () {
    // если запрос совпал(значит мы вернулись назад), то отдаём старые вакансии, иначе ищем новые
    if (this._request == this._router.currentRoute) {
      this._view.render(this._vacancies);
    } else {
      this._request = this._router.currentRoute;
      this._globalEventBus.triggerEvent(VACANCY.search, this._request);
    }
  }
}