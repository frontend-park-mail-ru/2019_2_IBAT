import { IndexView } from '../views/Index/IndexView';
import { IndexModel } from '../models/IndexModel';
import { EventBus } from '../modules/eventbus';

const eventList=[
  'getVacancies',
  'getVacanciesSuccess',
  'getVacanciesFailed',
  'getResumes',
  'getResumesSuccess',
  'getResumesFailed',
  'checkAuth',
  'checkAuthResponse'
];

export class IndexController {
  constructor (root, globalEventBus) {
    this._eventBus = new EventBus(eventList);

    this.indexView = new IndexView(root, this._eventBus, globalEventBus);
    this.indexModel = new IndexModel(this._eventBus);
  }

}
