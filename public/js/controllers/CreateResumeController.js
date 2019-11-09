import { CreateResumeModel } from '../models/CreateResumeModel';
import { CreateResumeView } from '../views/CreateResume/CreateResumeView';
import { Controller } from '../modules/controller';
import { EventBus } from '../modules/eventbus';

const eventList = [
  'createResume',
  'createSuccess',
  'createFailed'
];

export class CreateResumeController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    const eventBus = new EventBus(eventList);
    eventBus.subscribeToEvent('createSuccess', (_)=>{
      this._router.redirect('/');
    });

    this._view = new CreateResumeView(this._root, eventBus, this._globalEventBus);
    this._model = new CreateResumeModel(eventBus);
  }
}
