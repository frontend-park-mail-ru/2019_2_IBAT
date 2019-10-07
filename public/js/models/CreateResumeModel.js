import { Api } from '../modules/api';

export class CreateResumeModel {

  constructor (eventBus) {
    this._eventBus = eventBus;

    this._eventBus.subscribeToEvent('createResume', this._onCreateResume.bind(this));
  }

  _onCreateResume (resume) {
    Api.createResume(resume)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this._eventBus.triggerEvent('createSuccess', data);
          });
        } else {
          response.json().then(data => {
            this._eventBus.triggerEvent('createFailed', data);
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}

