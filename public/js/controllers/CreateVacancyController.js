import { EventBus } from '../modules/eventbus';
import { CreateVacancyView } from '../views/CreateVacancy/CreateVacancyView';
import { CreateVacancyModel } from '../models/CreateVacancyModel';

const eventList = [
  'createVacancy',
  'createSuccess',
  'createFailed'
];

export class CreateVacancyController {
  constructor (root, globalEventBus, router) {
    const eventBus = new EventBus(eventList);
    eventBus.subscribeToEvent('createSuccess', (_)=>{
      router.toStartPage();
    });
    this.createVacancyView = new CreateVacancyView(root, eventBus, globalEventBus);
    this.createVacancyModel = new CreateVacancyModel(eventBus);
  }
}
