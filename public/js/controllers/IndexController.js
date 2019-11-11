import { IndexView } from '../views/Index/IndexView';
import { Controller } from '../modules/controller';
import { AUTH } from '../modules/events';

export class IndexController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._globalEventBus.subscribeToEvent(AUTH.signOutResponse, () => {
      this._router.redirect('/');
    });

    //TODO по факту можно вообще в контроллере не указывать модели
    this._view = new IndexView(this._root, this._globalEventBus);
  }

}
