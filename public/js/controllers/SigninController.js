import { SignInView } from '../views/SignIn/SignInView';
import { Controller } from '../modules/controller';
import { AUTH } from '../modules/events';

export class SigninController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._globalEventBus.subscribeToEvent(AUTH.signInSuccess, (data) => {
      if (data.role) {
        if (data.role == 'support') {
          this._router.redirect('/chat');
        } else {
          this._router.redirect('/');
        }
      } else {
        this._router.redirect('/');
      }
    });

    this._view = new SignInView(this._root, this._globalEventBus);
  }
}
