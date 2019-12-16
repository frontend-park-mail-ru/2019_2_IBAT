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
          this._globalEventBus.triggerEvent(RESPOND.respondToVacancySuccess);
        } else {
          this._globalEventBus.triggerEvent(RESPOND.respondToVacancyFailed);
        }
      })
      .catch(error => {
        this._globalEventBus.triggerEvent(RESPOND.respondToVacancyFailed, error);
      });
  }

  //TODO этот запрос выполняется очень медленно! Нужно разбить на асинхронные вызовы и патчить отдельные куски, отправляя события о получении
  _onGetSeekerResponds (resumeId) {
    Api.getResponds(resumeId)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          response.json().then(error => {
            console.error(`_onGetSeekerResponds(): Failed - ${error}`);
            this._globalEventBus.triggerEvent(RESPOND.getEmployerRespondsFailed, error);
          });
        }
      })
      .then(data => {
        this._globalEventBus.triggerEvent(RESPOND.getSeekerRespondsSuccess, data);
      })
      // .then(data => {
      //   console.log(`_onGetSeekerResponds():\n responds = ${data}`);
      //   Promise.all(data.map(respond => Api.getVacancyById(respond.vacancy_id)))
      //     .then(responses => {
      //       console.log(`_onGetSeekerResponds():\n data = ${responses}`);
      //       return responses;
      //     })
        //     .then(responses => {
        //       console.log(`_onGetSeekerResponds():\n data = ${responses}`);
        //       return Promise.all(responses.map(r => r.json()));
        //     })
      //     .then(vacancies => {
      //       data.forEach(respond => respond.vacancy = vacancies.find(vacancy => vacancy.id === respond.vacancy_id));
      //       console.log(`_onGetSeekerResponds():\n data = ${data}`);
      //
      //       this._globalEventBus.triggerEvent(RESPOND.getSeekerRespondsSuccess, data);
      //     });
      // })
      .catch(error => {
        console.error(`_onGetSeekerResponds(): Failed - ${error}`);
      });

  }
}

export default new RespondModel();
