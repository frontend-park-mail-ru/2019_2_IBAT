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

  render (data = {}) {
    super.render(data);

    this._globalEventBus.triggerEvent(AUTH.checkAuth);
    this._globalEventBus.triggerEvent(RESPOND.getSeekerResponds);
  }

  /**
   * Получает отклики в виде вакансий со статусом от модели и отображает списком
   * @param responds
   * @private
   */
  _onGetSeekerRespondsSuccess (responds) {
    const list = document.createElement('div');
    list.className = 'list';

    this._root.querySelector('.left-column').appendChild(list);

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
