import { Api } from '../modules/api';

export class FavoriteVacanciesModel {

  constructor (eventBus) {
    this._eventBus = eventBus;
    this._eventBus.subscribeToEvent('loadFavorite', this._onLoad.bind(this));
  }

  _onLoad() {
    Api.getFavoriteVacancies()
        .then(response => {
            if (response.ok) {
                response.json().then(vacancies => {
                    console.log(vacancies);
                    this._eventBus.triggerEvent('loadSuccess', vacancies);
                });
            } else {
                console.log(response);
                this._eventBus.triggerEvent('loadSuccess', []);
            }
        })
        .catch(error => {
            console.error(error);
            this._eventBus.triggerEvent('loadSuccess', []);
        });
  }
}

