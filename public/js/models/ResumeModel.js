import { Api } from '../modules/api';
import { RESUME } from '../modules/events';

class ResumeModel {

  setGlobalEventBus (globalEventBus) {
    this._globalEventBus = globalEventBus;

    this._globalEventBus.subscribeToEvent(RESUME.search, this._onSearch.bind(this));
    this._globalEventBus.subscribeToEvent(RESUME.getResumes, this._onGetResumes.bind(this));
    this._globalEventBus.subscribeToEvent(RESUME.getResume, this._onGetResume.bind(this));
    this._globalEventBus.subscribeToEvent(RESUME.createResume, this._onCreateResume.bind(this));
    this._globalEventBus.subscribeToEvent(RESUME.getOwnResumes, this._onGetOwnResumes.bind(this));
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
            this._globalEventBus.triggerEvent(RESUME.getResumesSuccess, resumes);
          });
        } else {
          res.json().then(data => {
            this._globalEventBus.triggerEvent(RESUME.getResumesFailed, data);
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  _onCreateResume (resume) {
    Api.createResume(resume)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this._globalEventBus.triggerEvent(RESUME.createResumeSuccess, data);
          });
        } else {
          response.json().then(data => {
            this._globalEventBus.triggerEvent(RESUME.createResumeFailed, data);
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _onGetResume (id) {
    Api.getResumeById(id)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this._globalEventBus.triggerEvent(RESUME.getResumeSuccess, data);
          });
        } else {
          response.json().then(data => {
            this._globalEventBus.triggerEvent(RESUME.getResumesFailed, data);
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _onGetOwnResumes () {
    Api.getOwnResumes()
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this._globalEventBus.triggerEvent(RESUME.getOwnResumesSuccess, data);
          });
        } else {
          response.json().then(data => {
            this._globalEventBus.triggerEvent(RESUME.getOwnResumesFailed, data);
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _onSearch (request = '/resumes?') {
    console.log(request);
    
    Api.searchResumes(request)
      .then(response => {
        console.log(response);
        if (response.ok) {
          response.json().then(resumes => {
            console.log(resumes);
            this._globalEventBus.triggerEvent(RESUME.searchSuccess, resumes);
          });
        } else {
          response.json().then(data => {
            this._globalEventBus.triggerEvent(RESUME.searchFailed, data);
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

}

export default new ResumeModel();
