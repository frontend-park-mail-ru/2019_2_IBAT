import { EventBus } from '../modules/eventbus';
import { FoundVacanciesView } from '../views/FoundVacancies/FoundVacanciesView';
import { FoundVacanciesModel } from '../models/FoundVacanciesModel';

const eventList = [

];

export class FoundVacanciesController {
  constructor (root, globalEventBus, router) {
    const eventBus = new EventBus(eventList);

    this.foundVacanciesView = new FoundVacanciesView(root, eventBus, globalEventBus);
    this.foundVacanciesModel = new FoundVacanciesModel(eventBus);
  }
}
