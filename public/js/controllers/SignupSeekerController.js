import { EventBus } from '../modules/eventbus';
import { SignupSeekerView } from '../views/SignupSeeker/SignupSeekerView';
import { SignupSeekerModel } from '../models/SignupSeekerModel';

const eventList = [
  'signUp',
  'signUpSuccess',
  'signUpFailed',
];

export class SignupSeekerController {
  constructor (root, globalEventBus, router) {
    const eventBus = new EventBus(eventList);
    eventBus.subscribeToEvent('signUpSuccess', (data) => {
      globalEventBus.triggerEvent('headerLoad', data);
      router.toStartPage();
    });

    this.signupSeekerView = new SignupSeekerView(root, eventBus);
    this.signupSeekerModel = new SignupSeekerModel(eventBus);
  }
}
