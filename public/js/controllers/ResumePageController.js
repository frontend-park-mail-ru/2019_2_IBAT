import { EventBus } from '../modules/eventbus';
import { ResumePageView } from '../views/ResumePage/ResumePageView';
import { ResumePageModel } from '../models/ResumePageModel';

const eventList = [
  'loadResume',
  'loadResumeSuccess',
  'loadResumeFailed'
];

export class ResumePageController {
  constructor (root, globalEventBus, router) {
    const eventBus = new EventBus(eventList);

    this.resumePageView = new ResumePageView(root, eventBus);
    this.resumePageModel = new ResumePageModel(eventBus);
  }
}
