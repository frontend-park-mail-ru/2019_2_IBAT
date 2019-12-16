import { Api } from '../modules/api';
import { RESUME, VACANCY } from '../modules/events';
import Net from '../modules/net';

class VacancyModel {

  setGlobalEventBus (globalEventBus) {
    this._globalEventBus = globalEventBus;

    this._globalEventBus.subscribeToEvent(VACANCY.getVacancies, this._onGetVacancies.bind(this));
    this._globalEventBus.subscribeToEvent(VACANCY.getVacancy, this._onGetVacancy.bind(this));
    this._globalEventBus.subscribeToEvent(VACANCY.createVacancy, this._onCreateVacancy.bind(this));
    this._globalEventBus.subscribeToEvent(VACANCY.search, this._onSearch.bind(this));
    this._globalEventBus.subscribeToEvent(VACANCY.getFavorite, this._onGetFavorite.bind(this));
    this._globalEventBus.subscribeToEvent(VACANCY.getVacanciesRecommended, this._onGetVacancies.bind(this).bind(null,{recommended:true}));
  }

  _onGetVacancies (params = {}) {
    const queryString = Object.keys(params).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    }).join('&');

    Net.doGet({
      url: `/vacancies?${queryString}`,
    })
      .then(res => {
        if (res.ok) {
          res.json().then(data => {
            const vacancies = Object.keys(data).map(key => {
              return {
                vacancyId: key,
                ...data[key]
              };
            });
            this._globalEventBus.triggerEvent(VACANCY.getVacanciesSuccess, vacancies);
          });
        } else {
          res.json().then(data => {
            this._globalEventBus.triggerEvent(VACANCY.getVacanciesFailed, data);
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  _onCreateVacancy (vacancy = {}) {
    Api.createVacancy(vacancy)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            console.log(data);
            this._globalEventBus.triggerEvent(VACANCY.createVacancySuccess, data);
          });
        } else {
          response.json().then(data => {
            this._globalEventBus.triggerEvent(VACANCY.createVacancyFailed, data);
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _onGetVacancy (id) {
    Api.getVacancyById(id)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this._globalEventBus.triggerEvent(VACANCY.getVacancySuccess, data);
          });
        } else {
          response.json().then(data => {
            this._globalEventBus.triggerEvent(VACANCY.getVacancyFailed, data);
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _onSearch (request = '/vacancies?') {
    console.log(request);

    Api.searchVacancies(request)
      .then(response => {
        console.log(response);
        if (response.ok) {
          response.json().then(vacancies => {
            console.log(vacancies);
            this._globalEventBus.triggerEvent(VACANCY.searchSuccess, vacancies);
          });
        } else {
          response.json().then(data => {
            this._globalEventBus.triggerEvent(VACANCY.searchFailed, data);
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _onGetFavorite () {
    Api.getFavoriteVacancies()
      .then(response => {
        if (response.ok) {
          response.json().then(vacancies => {
            console.log(vacancies);
            this._globalEventBus.triggerEvent(VACANCY.getFavoriteSuccess, vacancies);
          });
        } else {
          console.log(response);
          this._globalEventBus.triggerEvent(VACANCY.getFavoriteSuccess, []);
        }
      })
      .catch(error => {
        console.error(error);
        this._globalEventBus.triggerEvent(VACANCY.getFavoriteSuccess, []);
      });
  }

  _onGetFavoriteIds () {
    Api.getFavoriteVacancies()
      .then(response => {
        if (response.ok) {
          response.json().then(vacancies => {
            console.log(vacancies);
            let ids = [];
            vacancies.forEach(v => {
              ids.push(v['id']);
            });
            this._globalEventBus.triggerEvent(VACANCY.getFavoriteIdsSuccess, ids);
          });
        } else {
          console.log(response);
          this._globalEventBus.triggerEvent(VACANCY.getFavoriteIdsSuccess, []);
        }
      })
      .catch(error => {
        console.error(error);
        this._globalEventBus.triggerEvent(VACANCY.getFavoriteIdsSuccess, []);
      });
  }
}

export default new VacancyModel();
