import template from './shortVacancy.pug';
import { Api } from '../../js/modules/api';
import Net from '../../js/modules/net';

export class ShortVacancyComponent{
    constructor (vacancy = {}) {
        this._vacancy = vacancy;

        this._vacancyCard = document.createElement('div');
        this._vacancyCard.className='card';
        this._vacancyCard.innerHTML = template(this._vacancy);

        Api.getEmployerById(this._vacancy.owner_id)
          .then(res=>{
              if(res.ok){
                res.json().then(employer=>{
                  this._vacancyCard.querySelector('.employer-logo')
                    .setAttribute('src',`${Net.getServerURL()}/${employer.path_to_img}`);
                });
              }
          })
          .catch(err=>console.error(err));
    }

    appendToList(list) {
        list.appendChild(this._vacancyCard);
    }
}
