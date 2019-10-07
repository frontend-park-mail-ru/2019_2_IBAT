import { EventBus } from '../modules/eventbus';
import { ProfileView } from '../views/Profile/ProfileView';
import { ProfileModel } from '../models/ProfileModel';

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

export class ProfileController {
  constructor (root, router) {
    const eventBus = new EventBus(eventList);
    eventBus.subscribeToEvent('saveProfileSuccess', () => {
      router.toStartPage();
    });

    this.profileView = new ProfileView(root, eventBus);
    this.profileModel = new ProfileModel(eventBus);
  }
}
