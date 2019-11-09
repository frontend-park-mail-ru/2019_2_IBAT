import { SigninModel } from '../models/SigninModel';
import { SignInView } from '../views/SignIn/SignInView';
import { Controller } from '../modules/controller';
import { EventBus } from '../modules/eventbus';

const eventList = [
  'signIn',
  'signInSuccess',
  'signInFailed',
];

export class SigninController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    const eventBus = new EventBus(eventList);
    eventBus.subscribeToEvent('signInSuccess', (data) => {
      this._globalEventBus.triggerEvent('headerLoad', data);
      this._router.redirect('/');
    });

    this._view = new SignInView(this._root, eventBus);
    this._model = new SigninModel(eventBus);
  }
}
