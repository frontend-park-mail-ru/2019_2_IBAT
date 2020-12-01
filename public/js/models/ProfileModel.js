import { Api } from '../modules/api';
import Net from '../modules/net';
import { PROFILE } from '../modules/events';

export class ProfileModel {

  setGlobalEventBus (globalEventBus) {
    this._globalEventBus = globalEventBus;

    this._globalEventBus.subscribeToEvent(PROFILE.loadProfile, this._onLoadProfile.bind(this));
    this._globalEventBus.subscribeToEvent(PROFILE.saveProfile, this._onSaveProfile.bind(this));
    this._globalEventBus.subscribeToEvent(PROFILE.saveAvatar, this._onSaveAvatar.bind(this));
  }

  _onLoadProfile () {
    Api.getProfile()
      .then(res => {
        if (res.ok) {
          res.json().then(data => {
            if(data.profile.path_to_img === 'default.jpg'){
              data.profile.path_to_img = `${Net.getServerImgURL()}/${data.profile.path_to_img}`;
            }
            else{
              data.profile.path_to_img = `${Net.getServerImgURL()}/${data.profile.path_to_img.split('/')[2]}`;
            }
            this._globalEventBus.triggerEvent(PROFILE.loadProfileSuccess, data);
          });
        } else {
          this._globalEventBus.triggerEvent(PROFILE.loadProfileFailed);
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
      this._globalEventBus.triggerEvent(PROFILE.saveProfileSuccess);
    } else {
      res.json().then(data => this._globalEventBus.triggerEvent(PROFILE.saveProfileFailed, data));
    }
  }

  _onSaveAvatar (avatar) {
    Api.uploadAvatar({ avatar })
      .then(res => {
        if (res.ok) {
          this._globalEventBus.triggerEvent(PROFILE.saveAvatarSuccess);
        } else {
          res.json().then(data => {
            this._globalEventBus.triggerEvent(PROFILE.saveAvatarFailed, data);
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
}

export default new ProfileModel();
