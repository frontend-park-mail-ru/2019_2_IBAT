import { EventBus } from '../modules/eventbus';
import { CreateResumeView } from '../views/CreateResume/CreateResumeView';
import { CreateResumeModel } from '../models/CreateResumeModel';

const eventList = [
  'createResume',
  'createSuccess',
  'createFailed'
];

export class CreateResumeController {
  constructor (root, globalEventBus, router) {
    const eventBus = new EventBus(eventList);
    eventBus.subscribeToEvent('createSuccess', (_)=>{
      router.toStartPage();
    });
    this.createResumeView = new CreateResumeView(root, eventBus, globalEventBus);
    this.createResumeModel = new CreateResumeModel(eventBus);
  }
}
