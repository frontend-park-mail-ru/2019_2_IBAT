import { ResumePageModel } from '../models/ResumePageModel';
import { ResumePageView } from '../views/ResumePage/ResumePageView';
import { Controller } from '../modules/controller';
import { EventBus } from '../modules/eventbus';

const eventList = [
  'loadResume',
  'loadResumeSuccess',
  'loadResumeFailed'
];

export class ResumePageController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, null, null);

    const eventBus = new EventBus(eventList);

    this._view = new ResumePageView(this._root, eventBus);
    this._view = new ResumePageModel(eventBus);
  }
}
