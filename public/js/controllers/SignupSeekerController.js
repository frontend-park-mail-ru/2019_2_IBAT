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
    this._eventBus = new EventBus(eventList);
    this._eventBus.subscribeToEvent('signUpSuccess', (data) => {
      globalEventBus.triggerEvent('headerLoad', data);
      router.toStartPage();
    });

    this.signupSeekerView = new SignupSeekerView(root, this._eventBus);
    this.signupSeekerModel = new SignupSeekerModel(this._eventBus);
  }
}
