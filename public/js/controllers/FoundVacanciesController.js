import { FoundVacanciesModel } from '../models/FoundVacanciesModel';
import { FoundVacanciesView } from '../views/FoundVacancies/FoundVacanciesView';
import { Controller } from '../modules/controller';
import { EventBus } from '../modules/eventbus';

const eventList = [
  // will appear soon
];

export class FoundVacanciesController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    const eventBus = new EventBus(eventList);

    this._view = new FoundVacanciesView(this._root, eventBus, this._globalEventBus);
    this._model = new FoundVacanciesModel(eventBus);
  }
}
