import { CreateVacancyView } from '../views/CreateVacancy/CreateVacancyView';
import { Controller } from '../modules/controller';
import { VACANCY } from '../modules/events';

export class CreateVacancyController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._globalEventBus.subscribeToEvent(VACANCY.createVacancySuccess, (_) => {
      //TODO перенаправлять на страницу вакансии
      this._router.redirect('/');
    });

    this._view = new CreateVacancyView(this._root, this._globalEventBus);
  }
}
