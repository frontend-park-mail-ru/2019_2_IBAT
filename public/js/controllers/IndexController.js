import { IndexView } from '../views/Index/IndexView';
import { Controller } from '../modules/controller';
import { ACTIONS, AUTH, VACANCY } from '../modules/events';

export class IndexController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._globalEventBus.subscribeToEvent(AUTH.signOutResponse, () => {
      localStorage.removeItem('role');

      this._router.redirect({ path: '/' });
    });

    this._globalEventBus.subscribeToEvent(ACTIONS.seekerGuestSlide, (data) => {
      this._router.redirect({ path: '/', data });
    });

    this._globalEventBus.subscribeToEvent(ACTIONS.employerGuestSlide, (data) => {
      this._router.redirect({ path: '/', data });
    });

    this._globalEventBus.subscribeToEvent(ACTIONS.guestSignInOnRespond, (data) => {
      this._router.redirect({ path: '/signin', prevState: data });
    });

    this._globalEventBus.subscribeToEvent(VACANCY.goToVacancyPage, (data) => {
      this._router.redirect({ path: `/vacancyPage/${data.vacancyId}`, data: data });
    });

    this._view = new IndexView(this._root, this._globalEventBus);
  }

}
