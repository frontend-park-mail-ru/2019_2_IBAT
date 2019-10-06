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
    this._eventBus = new EventBus(eventList);
    this._eventBus.subscribeToEvent('signInSuccess', (data) => {
      globalEventBus.triggerEvent('headerLoad', data);
      router.toStartPage();
    });

    this.signInView = new SignInView(root, this._eventBus);
    this.signInModel = new SigninModel(this._eventBus);
  }
}
