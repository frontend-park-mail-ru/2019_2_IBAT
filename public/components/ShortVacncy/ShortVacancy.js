import template from './shortVacancy.pug';
import { Api } from '../../js/modules/api';
import Net from '../../js/modules/net';

export class ShortVacancyComponent{
    constructor (data = {}) {
        this._data = data;

        this._vacancy = document.createElement('div');
        this._vacancy.className='card';
        this._vacancy.innerHTML = template(this._data);

        Api.getEmployerById(this._data.vacancy.owner_id)
          .then(res=>{
              if(res.ok){
                res.json().then(data=>{
                  this._vacancy.querySelector('.employer-logo')
                    .setAttribute('src',`${Net.getServerURL()}/${data.path_to_img}`);
                });
              }
          })
          .catch(err=>console.error(err));
    }

    appendToList(list) {
        list.appendChild(this._vacancy);
    }
}
