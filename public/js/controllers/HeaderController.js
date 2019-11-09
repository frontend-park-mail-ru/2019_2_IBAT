import { HeaderModel } from '../models/HeaderModel';
import { HeaderView } from '../views/Header/HeaderView';
import { Controller } from '../modules/controller';
import { EventBus } from '../modules/eventbus';

const eventList = [
  'checkAuth',
  'checkAuthResponse',
  'signOut',
  'signOutResponse'
];

export class HeaderController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    const eventBus = new EventBus(eventList);
    eventBus.subscribeToEvent('signOutResponse', ()=>{
      this._router.redirect('/');
    });

    this._view = new HeaderView(this._root, eventBus, this._globalEventBus);
    this._model = new HeaderModel(eventBus);
  }
}
