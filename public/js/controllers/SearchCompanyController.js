import { SearchCompanyView } from '../views/SearchCompany/SearchCompanyView';
import { Controller } from '../modules/controller';
import { COMPANY } from '../modules/events';

export class SearchCompanyController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._view = new SearchCompanyView(this._root, this._globalEventBus);
  }
}
