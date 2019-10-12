import { Api } from '../modules/api';

export class ResumePageModel {

  constructor (eventBus) {
    this._eventBus = eventBus;

    this._eventBus.subscribeToEvent('loadResume', this._loadResume.bind(this));
  }

  _loadResume (id) {
    Api.getResumeById(id)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this._eventBus.triggerEvent('loadResumeSuccess', data);
          });
        } else {
          response.json().then(data => {
            this._eventBus.triggerEvent('loadResumeFailed', data);
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}

