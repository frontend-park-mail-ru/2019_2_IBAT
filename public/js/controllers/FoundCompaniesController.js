import { FoundCompaniesView } from '../views/FoundCompanies/FoundCompaniesView';
import { Controller } from '../modules/controller';
import { ACTIONS, COMPANY } from '../modules/events';

export class FoundCompaniesController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);
    this._companies = [];
    this._request = '';
    this._view = new FoundCompaniesView(this._root, this._globalEventBus);

    this._globalEventBus.subscribeToEvent(ACTIONS.changeRequest, _=>{
      this._router.back();
    });

    this._globalEventBus.subscribeToEvent(COMPANY.searchSuccess, companies => {
      this._companies = companies;
      this._view.render(this._companies);
    })

    this._globalEventBus.subscribeToEvent(COMPANY.searchFailed, _ => {
      this._view.render();
    })
  }

  openWithData () {
    // если запрос совпал(значит мы вернулись назад), то отдаём старые companies, иначе ищем новые
    if (this._request == this._router.currentRoute) {
      this._view.render(this._companies);
    } else {
      this._request = this._router.currentRoute;
      this._globalEventBus.triggerEvent(COMPANY.search, this._request);
    }
  }
}