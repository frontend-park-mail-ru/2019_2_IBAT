import { Api } from '../modules/api';
import { COMPANY, PROFILE } from '../modules/events';

export class CompanyModel {

  setGlobalEventBus (globalEventBus) {
    this._globalEventBus = globalEventBus;

    this._globalEventBus.subscribeToEvent(COMPANY.getPopularCompanies, this._onGetPopularCompanies.bind(this));
    this._globalEventBus.subscribeToEvent(COMPANY.getCompanyInfo, this._onGetCompanyInfo.bind(this));
  }

  _onGetCompanyInfo(id) {
    console.log(id);
    Api.getEmployerById(id)
      .then(res => {
        if (res.ok) {
          res.json().then(data => {
            console.log(data);
            this._globalEventBus.triggerEvent(COMPANY.getCompanyInfoSuccess, data);
          });
        }
      })
  }

  _onGetPopularCompanies () {
    // Net.doGet({
    //   url: '/company/'
    // })
    new Promise((resolve, reject) => {
      const data = {
        companies: [
          { id: '235fsd655423dfjsdf2', name: 'Sberbank' },
          { id: '235fsd655423dfjsdf2', name: 'Sberbank' },
          { id: '235fsd655423dfjsdf2', name: 'Sberbank' },
          { id: '235fsd655423dfjsdf2', name: 'Sberbank' },
          { id: '235fsd655423dfjsdf2', name: 'Sberbank' },
          { id: '235fsd655423dfjsdf2', name: 'Sberbank' },
          { id: '235fsd655423dfjsdf2', name: 'Sberbank' },
        ]
      };
      resolve(data);
    })
      .then(res => {
        this._globalEventBus.triggerEvent(COMPANY.getPopularCompaniesSuccess, res);
        // if (res.ok) {
        //   res.json().then(data => {
        //     data.profile.path_to_img = `${Net.getServerURL()}/${data.profile.path_to_img}`;
        //     this._globalEventBus.triggerEvent(PROFILE.loadProfileSuccess, data);
        //   });
        // } else {
        //   this._globalEventBus.triggerEvent(PROFILE.loadProfileFailed);
        // }
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export default new CompanyModel();
