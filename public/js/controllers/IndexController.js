import { IndexView } from '../views/Index/IndexView';
import { Controller } from '../modules/controller';
import { ACTIONS, AUTH } from '../modules/events';

export class IndexController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._globalEventBus.subscribeToEvent(AUTH.signOutResponse, () => {
      this._router.redirect('/');
    });

    this._globalEventBus.subscribeToEvent(ACTIONS.seekerGuestSlide, (data)=>{
      this._router.redirect('/', data);
    });

    this._globalEventBus.subscribeToEvent(ACTIONS.employerGuestSlide, (data)=>{
      this._router.redirect('/', data);
    });

    this._view = new IndexView(this._root, this._globalEventBus);
  }

}
