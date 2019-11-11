import { SignupEmployerView } from '../views/SignupEmployer/SignupEmployerView';
import { Controller } from '../modules/controller';
import { AUTH } from '../modules/events';

export class SignupEmployerController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._globalEventBus.subscribeToEvent(AUTH.signUpSuccess, (data) => {
      this._router.redirect('/');
    });

    this._view = new SignupEmployerView(this._root, this._globalEventBus);
  }
}
