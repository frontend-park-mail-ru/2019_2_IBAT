import { SignupSeekerModel } from '../models/SignupSeekerModel';
import { SignupSeekerView } from '../views/SignupSeeker/SignupSeekerView';
import { Controller } from '../modules/controller';
import { EventBus } from '../modules/eventbus';

const eventList = [
  'signUp',
  'signUpSuccess',
  'signUpFailed',
];

export class SignupSeekerController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    const eventBus = new EventBus(eventList);
    eventBus.subscribeToEvent('signUpSuccess', (data) => {
      this._globalEventBus.triggerEvent('headerLoad', data);
      this._router.redirect('/');
    });

    this._view = new SignupSeekerView(this._root, eventBus);
    this._model = new SignupSeekerModel(eventBus);
  }
}
