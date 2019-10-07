import { Api } from '../modules/api';
import Net from '../modules/net';

export class ProfileModel {

  constructor (eventBus) {
    this._eventBus = eventBus;

    this._eventBus.subscribeToEvent('loadProfile', this._onLoadProfile.bind(this));
    this._eventBus.subscribeToEvent('saveProfile', this._onSaveProfile.bind(this));
    this._eventBus.subscribeToEvent('saveAvatar', this._onSaveAvatar.bind(this));
  }

  _onLoadProfile () {
    Api.getProfile()
      .then(res => {
        if (res.ok) {
          res.json().then(data => {
            data.profile.path_to_img= `${Net.getServerURL()}/${data.profile.path_to_img}`;
            this._eventBus.triggerEvent('loadProfileSuccess', data);
          });
        } else {
          this._eventBus.triggerEvent('loadProfileFailed');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _onSaveProfile (profile, role) {
    if (role === 'seeker') {
      Api.updateSeeker(profile)
        .then(this._onResponse.bind(this))
        .catch(err => {
          console.error(err);
        });
    }
    if (role === 'employer') {
      Api.updateEmployer(profile)
        .then(this._onResponse.bind(this))
        .catch(err => {
          console.error(err);
        });
    }
  }

  _onResponse (res) {
    if (res.ok) {
      this._eventBus.triggerEvent('saveProfileSuccess');
    } else {
      res.json().then(data => this._eventBus.triggerEvent('saveProfileFailed', data));
    }
  }

  _onSaveAvatar (avatar) {
    Api.uploadAvatar({ avatar })
      .then(res => {
        if (res.ok) {
            this._eventBus.triggerEvent('saveAvatarSuccess');
        } else {
          res.json().then(data => {
            this._eventBus.triggerEvent('saveAvatarFailed', data);
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
}

