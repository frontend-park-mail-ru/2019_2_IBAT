import template from './myResponds.pug';
import { View } from '../../modules/view';
import { ShortVacancyComponent } from '../../../components/ShortVacancy/ShortVacancy';
import { AUTH, RESPOND } from '../../modules/events';
import { Api } from '../../modules/api';

const statuses = {
  'awaits' : 'В ожидании',
  'rejected': 'Откланён',
  'acceptes': 'Подтверждён'
}

export class MyRespondsView extends View {
  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);

    this._globalEventBus.subscribeToEvent(RESPOND.getSeekerRespondsSuccess, this._onGetSeekerRespondsSuccess.bind(this));
  }

  render () {
    this._globalEventBus.triggerEvent(AUTH.checkAuth);
    this._globalEventBus.triggerEvent(RESPOND.getSeekerResponds);
  }

  /**
   * Получает отклики в виде вакансий со статусом от модели и отображает списком
   * @param responds
   * @private
   */
  _onGetSeekerRespondsSuccess (responds = []) {
    let data = {
      'number_of_responds': responds.length
    };
    super.render(data);

    const list = document.querySelector('.list');
   
    if (responds.length) {
      responds.forEach(respond => {
        Api.getVacancyById(respond.vacancy_id)
          .then(res => {
            if (res.ok) {
              return res.json();
            }
          })
          .then(vacancy => {
            new ShortVacancyComponent({
              data: {
                vacancy: vacancy,
                status: statuses[respond.Status],
              },
              globalEventBus: this._globalEventBus
            }).appendTo(list);
          })
          .catch(error => {
            console.error(error);
          });
      });
    }
  }
}
