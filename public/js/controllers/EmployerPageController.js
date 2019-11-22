import { Controller } from '../modules/controller';
import { COMPANY } from '../modules/events';
import { EmployerPageView } from '../views/EmployerPage/EmployerPageView';

export class EmployerPageController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._globalEventBus.subscribeToEvent(COMPANY.getCompanyInfoSuccess, (data)=> {
        console.log(data);
        this._data = data;
        this._view.render(this._data);
    });

    this._view = new EmployerPageView(this._root, this._globalEventBus);
  }

  openWithData(data = {}) {
    this._globalEventBus.triggerEvent(COMPANY.getCompanyInfo, data.id);
  }

  close() {
    this._view.hide();
    this._data = null;
  }
}
