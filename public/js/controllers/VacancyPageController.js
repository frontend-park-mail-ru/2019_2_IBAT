import { VacancyPageModel } from '../models/VacancyPageModel';
import { VacancyPageView } from '../views/VacancyPage/VacancyPageView';
import { Controller } from '../modules/controller';
import { EventBus } from '../modules/eventbus';

const eventList = [
  'loadVacancy',
  'loadVacancySuccess',
  'loadVacancyFailed',
  'respondToVacancy'
];

export class VacancyPageController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, null, null);
    const eventBus = new EventBus(eventList);

    eventBus.subscribeToEvent('respondToVacancy', data => {
      router.route('/chooseResumePage', data);
    });

    this._view = new VacancyPageView(this._root, eventBus);
    this._model = new VacancyPageModel(eventBus);
  }
}
