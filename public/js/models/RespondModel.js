import { Api } from '../modules/api';
import { RESPOND } from '../modules/events';

class RespondModel {

  setGlobalEventBus (globalEventBus) {
    this._globalEventBus = globalEventBus;

    this._globalEventBus.subscribeToEvent(RESPOND.respondToVacancy, this._onSendRespond.bind(this));
    this._globalEventBus.subscribeToEvent(RESPOND.getSeekerResponds, this._onGetSeekerResponds.bind(this));
  }

  _onSendRespond ({ resume_id, vacancy_id }) {
    Api.respondToVacancy(resume_id, vacancy_id)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this._globalEventBus.triggerEvent(RESPOND.respondToVacancySuccess, data);
          });
        } else {
          response.json().then(data => {
            this._globalEventBus.triggerEvent(RESPOND.respondToVacancySuccess, data);
          });
        }
      })
      .catch(error => {
        this._globalEventBus.triggerEvent(RESPOND.respondToVacancySuccess, data);
      });
  }

  _onGetSeekerResponds (resumeId) {
    Api.getResponds(resumeId)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          response.json().then(data => {
            this._globalEventBus.triggerEvent(RESPOND.getEmployerRespondsFailed, data);
          });
        }
      })
      .then(data => {
        Promise.all(data.map(respond => Api.getVacancyById(respond.vacancy_id)))
          .then(responses => {
            return responses;
          })
          .then(responses => Promise.all(responses.map(r => r.json())))
          .then(vacancies => {
            data.forEach(respond => respond.vacancy = vacancies.find(vacancy => vacancy.id === respond.vacancy_id));
            console.log(vacancies);

            this._globalEventBus.triggerEvent(RESPOND.getSeekerRespondsSuccess, data);
          });
      })
      .catch(error => {
        console.error(error);
      });

  }
}

export default new RespondModel();
