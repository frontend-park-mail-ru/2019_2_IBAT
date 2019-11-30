import { Api } from '../modules/api';
import { COMPANY, PROFILE } from '../modules/events';
import Net from '../modules/net';

export class CompanyModel {

  setGlobalEventBus (globalEventBus) {
    this._globalEventBus = globalEventBus;

    this._globalEventBus.subscribeToEvent(COMPANY.getPopularCompanies, this._onGetPopularCompanies.bind(this));
    this._globalEventBus.subscribeToEvent(COMPANY.getCompanyInfo, this._onGetCompanyInfo.bind(this));
    this._globalEventBus.subscribeToEvent(COMPANY.search, this._onSearchCompanies.bind(this));
  }

  _onGetCompanyInfo (id) {
    console.log(id);
    Api.getEmployerById(id)
      .then(res => {
        if (res.ok) {
          res.json().then(data => {
            console.log(data);
            //TODO ЭТО КОСТЫЛЬ, split('/')[2] --- убрать!!!
            data.path_to_img = `${Net.getServerImgURL()}/${data.path_to_img.split('/')[2]}`;

            this._globalEventBus.triggerEvent(COMPANY.getCompanyInfoSuccess, data);
          });
        }
      });
  }

  _onGetPopularCompanies () {
    Net.doGet({
      url: '/employers'
    })
      .then(res => {
        if (res.ok) {
          res.json().then(data => {
            this._globalEventBus.triggerEvent(COMPANY.getPopularCompaniesSuccess, {companies: data});
          });
        } else {
          this._globalEventBus.triggerEvent(PROFILE.loadProfileFailed);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  _onSearchCompanies (request = '/employers?') {
    console.log(request);

    Api.searchCompanies(request)
      .then(res => {
        if (res.ok) {
          res.json().then(employers => {
            this._globalEventBus.triggerEvent(COMPANY.searchSuccess, employers);
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export default new CompanyModel();
