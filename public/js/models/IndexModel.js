import { Api } from '../modules/api';

export class IndexModel {

  constructor (eventBus) {
    this._eventBus = eventBus;

    this._eventBus.subscribeToEvent('getVacancies', this._onGetVacancies.bind(this));
    this._eventBus.subscribeToEvent('getResumes', this._onGetResumes.bind(this));
    this._eventBus.subscribeToEvent('checkAuth', this._onCheckAuth.bind(this));
  }

  _onGetVacancies () {
    Api.getVacancies()
      .then(res => {
        if (res.ok) {
          res.json().then(data => {
            const vacancies = Object.keys(data).map(key => {
              return {
                vacancyId: key,
                ...data[key]
              };
            });
            this._eventBus.triggerEvent('getVacanciesSuccess', vacancies);
          });
        } else {
          res.json().then(data => {
            this._eventBus.triggerEvent('getVacanciesFailed', data);
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  _onGetResumes () {
    Api.getResumes()
      .then(res => {
        if (res.ok) {
          res.json().then(data => {
            const resumes = Object.keys(data).map(key => {
              return {
                resumeId: key,
                ...data[key]
              };
            });
            this._eventBus.triggerEvent('getResumesSuccess', resumes);
          });
        } else {
          res.json().then(data => {
            this._eventBus.triggerEvent('getResumesFailed', data);
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  _onCheckAuth () {
    Api.checkSession()
      .then(response => {
        if (response.status === 401 || response.ok) {
          return response.json();
        } else {
          throw Error(response.status);
        }
      })
      .then(body => {
        this._eventBus.triggerEvent('checkAuthResponse', body);
      })
      .catch(error => {
        console.error(error);
      });
  }
}

