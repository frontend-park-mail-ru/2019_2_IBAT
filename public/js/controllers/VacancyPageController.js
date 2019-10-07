import { EventBus } from '../modules/eventbus';
import { VacancyPageView } from '../views/VacancyPage/VacancyPageView';
import { VacancyPageModel } from '../models/VacancyPageModel';

const eventList = [
  'loadVacancy',
  'loadVacancySuccess',
  'loadVacancyFailed'
];

export class VacancyPageController {
  constructor (root, globalEventBus, router) {
    const eventBus = new EventBus(eventList);

    this.vacancyPageView = new VacancyPageView(root, eventBus);
    this.vacancyPageModel = new VacancyPageModel(eventBus);
  }
}
