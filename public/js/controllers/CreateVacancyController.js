import { CreateVacancyModel } from '../models/CreateVacancyModel';
import { CreateVacancyView } from '../views/CreateVacancy/CreateVacancyView';
import { Controller } from '../modules/controller';
import { EventBus } from '../modules/eventbus';

const eventList = [
  'createVacancy',
  'createSuccess',
  'createFailed'
];

export class CreateVacancyController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    const eventBus = new EventBus(eventList);
    eventBus.subscribeToEvent('createSuccess', (_)=>{
      this._router.redirect('/');
    });

    this._view = new CreateVacancyView(this._root, eventBus, this._globalEventBus);
    this._model = new CreateVacancyModel(eventBus);
  }
}
