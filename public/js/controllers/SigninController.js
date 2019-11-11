import { SignInView } from '../views/SignIn/SignInView';
import { Controller } from '../modules/controller';
import { AUTH } from '../modules/events';

export class SigninController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._globalEventBus.subscribeToEvent(AUTH.signInSuccess, (data) => {
      this._router.redirect('/');
    });

    this._view = new SignInView(this._root, this._globalEventBus);
  }
}
