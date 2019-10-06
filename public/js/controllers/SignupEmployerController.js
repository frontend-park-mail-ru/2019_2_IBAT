import { EventBus } from '../modules/eventbus';
import { SignupEmployerView } from '../views/SignupEmployer/SignupEmployerView';
import { SignupEmployerModel } from '../models/SignupEmployerModel';

const eventList = [
  'signUp',
  'signUpSuccess',
  'signUpFailed',
];

export class SignupEmployerController {
  constructor (root, globalEventBus, router) {
    this._eventBus = new EventBus(eventList);
    this._eventBus.subscribeToEvent('signUpSuccess', (data) => {
      globalEventBus.triggerEvent('headerLoad', data);
      router.toStartPage();
    });

    this.signupEmployerView = new SignupEmployerView(root, this._eventBus);
    this.signupEmployerModel = new SignupEmployerModel(this._eventBus);
  }
}
