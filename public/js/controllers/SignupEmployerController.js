import { SignupEmployerModel } from '../models/SignupEmployerModel';
import { SignupEmployerView } from '../views/SignupEmployer/SignupEmployerView';
import { Controller } from '../modules/controller';
import { EventBus } from '../modules/eventbus';

const eventList = [
  'signUp',
  'signUpSuccess',
  'signUpFailed',
];

export class SignupEmployerController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    const eventBus = new EventBus(eventList);
    eventBus.subscribeToEvent('signUpSuccess', (data) => {
      this._globalEventBus.triggerEvent('headerLoad', data);
      this._router.redirect('/');
    });

    this._view = new SignupEmployerView(this._root, eventBus);
    this._model = signupEmployerModel = new SignupEmployerModel(eventBus);
  }
}
