import { Controller } from '../modules/controller';
import { MyVacanciesView } from '../views/MyVacancies/MyVacanciesView';
import { Api } from '../modules/api';

export class MyVacanciesController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._view = new MyVacanciesView(this._root, this._globalEventBus);
  }

  openWithData() {
    Api.getOwnVacancies()
    .then(response => {
        return response.ok ? response.json() : null;
    })
    .then(vacancies => {
        console.log(vacancies);
        this._view.render(vacancies);
    })
    .catch(error => {
        console.log(error);
    })
  }
}
