import { SignInView } from '../views/SignIn/SignInView';
import { Controller } from '../modules/controller';
import { AUTH, CHAT } from '../modules/events';

export class SigninController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._globalEventBus.subscribeToEvent(AUTH.signInSuccess, (data) => {

      this._globalEventBus.triggerEvent(CHAT.openWs);
      // if (data.role) {
      //   if (data.role == 'support') {
      //     window.location = '/chat'
      //   } else {
      //     this._router.redirect('/');
      //   }
      // } else {
      //   this._router.redirect('/');
      // }
      console.log(`SignInSuccess() --- ${data.role}`);

      localStorage.setItem('role', data.role);
      if (history.state.vacancyId) {
        this._router.redirect({ path: `/vacancy/${history.state.vacancyId}` });
      } else {
        this._router.redirect({ path: '/' });
      }
    });

    this._view = new SignInView(this._root, this._globalEventBus);
  }
}
