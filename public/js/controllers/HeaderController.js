import { HeaderView } from '../views/Header/HeaderView';
import { HeaderModel } from '../models/HeaderModel';
import { EventBus } from '../modules/eventbus';

const eventList = [
  'checkAuth',
  'checkAuthResponse',
  'signOut',
  'signOutResponse'
  // SERVICE.LOAD_USER,
  // SERVICE.LOAD_USER_RESPONSE,
  // ROUTER.BACK_TO_MENU
];

export class HeaderController {
  constructor (root, globalEventBus) {
    const eventBus = new EventBus(eventList);

    this.headerView = new HeaderView(root, eventBus, globalEventBus);
    this.headerModel = new HeaderModel(eventBus);
  }
}
