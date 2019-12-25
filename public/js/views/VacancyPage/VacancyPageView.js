import template from './vacancyPage.pug';
import { View } from '../../modules/view';
import { ACTIONS, AUTH, VACANCY } from '../../modules/events';
import { Api } from '../../modules/api';
import { ShortResumeComponent } from '../../../components/ShortResume/ShortResume';

export class VacancyPageView extends View {

  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);

    this._globalEventBus.subscribeToEvent(VACANCY.getVacancySuccess, this._onGetVacancySuccess.bind(this));
    this._globalEventBus.subscribeToEvent(VACANCY.getVacancyFailed, this._onGetVacancyFailed.bind(this));
  }

  render (data = {}) {
    this.merge(data);
    this.isViewClosed = false;

    this._globalEventBus.triggerEvent(VACANCY.getVacancy, this.data.id);
  }

  /**
   * Получает конкретную вакансию от модели и ставит слушатель на "Откликнуться"
   * @param data
   * @private
   */
  _onGetVacancySuccess (data = {}) {
    if(this.isViewClosed){
      return;
    }
    this.merge(data);

    this.data['wage_from'] = this.data['wage_from'].split('.')[0];
    this.data['wage_to'] = this.data['wage_to'].split('.')[0];
    this.data['seeker'] = localStorage.getItem('role').match(/seeker/);

    Api.getProfile()
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.text);
        }
      })
      .then(profileData => {
        let my_id = profileData.profile.id;
        this.data = { ...this.data, my_id };
        super.render(this.data);
        return document.querySelector('.company__vacancies-list');
      })
      .then(list => {
        if (list) {
          this._list = list;
          console.log(this.data.id);
          return Api.getResponds(undefined, this.data.id);
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(res.text);
        }
      })
      .then(responds => {
        console.log(responds);
        let query = '?';
        responds.forEach((r, i) => {
          query += `id${i}=${r.resume_id}&`;
        });
        if (query != '?') {
          console.log(query);
          return Api.getResumesByIds(query);
        }
      })
      .then(res => {
        if (res) {
          if (res.ok) {
            return res.json();
          }
        }
      })
      .then((resumes = []) => {
        console.log(resumes);
        if (resumes.length) {
          resumes.forEach(resume => {
            new ShortResumeComponent({resume}).appendTo(this._list);
          })
        } else {
          this._list.innerHTML = '<p>На эту вакансию ещё никто не откликнулся.'
        }
      })
      .catch(error => {
        console.error(error);
        super.render(this.data);
      });
  }

  onRender () {
    if (!this.data.is_responded) {
      this.respondButton = document.getElementById('respondToVacancyButton');
      if (this.respondButton) {
        this.respondButton.addEventListener('click', (ev) => {
          if (this.getRole.match(/Guest/)) {
            this._globalEventBus.triggerEvent(ACTIONS.guestSignInOnRespond, {
              vacancyId: this.data.id
            });
          } else {
            this._globalEventBus.triggerEvent(VACANCY.chooseResume, {
              vacancyId: this.data.id
            });
          }
        });
      }
    }

    if (!this.data.favorite) {
      let toFavorite = document.querySelector('[name="switch"]');
      if (toFavorite) {
        toFavorite.addEventListener('click', this._onToFavorite.bind(this), true);
      }
    }

    if (this.startChatButton) {
      this.startChatButton.addEventListener('click', (ev) => {
        this._globalEventBus.triggerEvent(ACTIONS.startChat, this.data.owner_id);
      });
    }
  }

  /**
   * Вызывется при ошибке получения вакансии
   * @param error
   * @private
   */
  _onGetVacancyFailed (error) {
    //
  }

  _onToFavorite (event) {
    console.log(event);
    let link = event.currentTarget;
    Api.addFavoriteVacancy(link.id)
      .then(res => {
        if (res.ok) {
          link.classList.add('short-vacancy__favorite_selected');
          link.removeEventListener('click', this._onToFavorite.bind(this));
        } else {
          console.log(res);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  get startChatButton () {
    return this._root.querySelector('button[id=startChat]');
  }
}
