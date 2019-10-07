import { EventBus } from '../modules/eventbus';
import { SignInView } from '../views/SignIn/SignInView';
import { SigninModel } from '../models/SigninModel';

const eventList = [
  'signIn',
  'signInSuccess',
  'signInFailed',
];

export class SigninController {
  constructor (root, globalEventBus, router) {
    const eventBus = new EventBus(eventList);
    eventBus.subscribeToEvent('signInSuccess', (data) => {
      globalEventBus.triggerEvent('headerLoad', data);
      router.toStartPage();
    });

    this.signInView = new SignInView(root, eventBus);
    this.signInModel = new SigninModel(eventBus);
  }
}
