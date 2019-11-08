import { HeaderView } from '../views/Header/HeaderView';
import { HeaderModel } from '../models/HeaderModel';
import { EventBus } from '../modules/eventbus';

const eventList = [
  'checkAuth',
  'checkAuthResponse',
  'signOut',
  'signOutResponse'
];

export class HeaderController {
  constructor (root, globalEventBus, router) {
    const eventBus = new EventBus(eventList);
    eventBus.subscribeToEvent('signOutResponse', ()=>{
      router.redirect('/');
    });

    this.headerView = new HeaderView(root, eventBus, globalEventBus);
    this.headerModel = new HeaderModel(eventBus);
  }
}
