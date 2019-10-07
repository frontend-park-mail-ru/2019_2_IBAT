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
    const eventBus = new EventBus(eventList);
    eventBus.subscribeToEvent('signUpSuccess', (data) => {
      globalEventBus.triggerEvent('headerLoad', data);
      router.toStartPage();
    });

    this.signupEmployerView = new SignupEmployerView(root, eventBus);
    this.signupEmployerModel = new SignupEmployerModel(eventBus);
  }
}
