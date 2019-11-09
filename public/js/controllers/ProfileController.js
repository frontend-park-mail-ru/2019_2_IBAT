import { ProfileModel } from '../models/ProfileModel';
import { ProfileView } from '../views/Profile/ProfileView';
import { Controller } from '../modules/controller';
import { EventBus } from '../modules/eventbus';

const eventList = [
  'loadProfile',
  'loadProfileSuccess',
  'loadProfileFailed',
  'saveButtonClicked',
  'saveProfile',
  'saveProfileSuccess',
  'saveProfileFailed',
  'saveAvatar',
  'saveAvatarSuccess',
  'saveAvatarFailed'
];

export class ProfileController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, null, router);

    const eventBus = new EventBus(eventList);
    eventBus.subscribeToEvent('saveProfileSuccess', () => {
      router.redirect('/');
    });

    this._view = new ProfileView(this._root, eventBus);
    this._model = new ProfileModel(eventBus);
  }
}
