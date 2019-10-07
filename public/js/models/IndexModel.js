import { Api } from '../modules/api';
import { ShortVacancyComponent } from '../../components/ShortVacncy/ShortVacancy';

export class IndexModel {

  constructor (eventBus) {
    this._eventBus = eventBus;

    this._eventBus.subscribeToEvent('getVacancies', this._onGetVacancies.bind(this));
  }

  _onGetVacancies () {
    Api.getVacancies()
      .then(res => {
        if (res.ok) {
          res.json().then(data=>{
            this._eventBus.triggerEvent('getVacanciesSuccess', data);
          });
        }
        else{
          res.json().then(data=>{
            this._eventBus.triggerEvent('getVacanciesFailed', data);
          });
        }
      })
      .catch(err=>{
        console.error(err);
      });
  }
}

