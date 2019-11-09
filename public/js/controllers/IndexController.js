import { IndexModel } from '../models/IndexModel';
import { IndexView } from '../views/Index/IndexView';
import { Controller } from '../modules/controller';
import { EventBus } from '../modules/eventbus';

const eventList = [
  'getVacancies',
  'getVacanciesSuccess',
  'getVacanciesFailed',
  'getResumes',
  'getResumesSuccess',
  'getResumesFailed',
  'checkAuth',
  'checkAuthResponse'
];

export class IndexController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, null)

    const eventBus = new EventBus(eventList);

    this._view = new IndexView(this._root, eventBus, this._globalEventBus);
    this._model = new IndexModel(eventBus);
  }

}
