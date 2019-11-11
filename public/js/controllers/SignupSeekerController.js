import { SignupSeekerView } from '../views/SignupSeeker/SignupSeekerView';
import { Controller } from '../modules/controller';
import { AUTH } from '../modules/events';

export class SignupSeekerController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._globalEventBus.subscribeToEvent(AUTH.signUpSuccess, (data) => {
      this._router.redirect('/');
    });

    this._view = new SignupSeekerView(this._root, this._globalEventBus);
  }
}
