import { Api } from '../modules/api';

export class SearchVacancyModel {

  constructor (eventBus) {
    this._eventBus = eventBus;
    this._eventBus.subscribeToEvent('find', this._onFind.bind(this));
  }

  _onFind(searchParameters) {
    console.log(searchParameters);

      let getParameters = '?';

      // Временный костыль, на бэке не обрабатывается остальное
      getParameters += 
        // 'region=' + searchParameters['region'] + '&' +
        'wage=' + searchParameters['wage'] + '&' +
        'experience=' + searchParameters['experience'];
      // конец костыля

      searchParameters['type_of_employment'].forEach(element => {
        getParameters += '&type_of_employment=' + element
      });

      searchParameters['work_schedule'].forEach(element => {
        getParameters += '&work_schedule=' + element
      });
      console.log('getParameters:', getParameters);
      
      let url = '/vacancies' + getParameters
      
      Api.searchVacancies(getParameters)
        .then (response => {
          console.log(response)
          if (response.ok) {
            response.json().then(data => {
              console.log(data)
              this._eventBus.triggerEvent('searchSuccess', url, data);
            });
          } else {
            response.json().then(data => {
              this._eventBus.triggerEvent('searchFailed', data);
            });
          }
        })
        .catch(error => {
          console.error(error);
        });
  }
}

