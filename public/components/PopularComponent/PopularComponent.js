import template from './popularComponent.pug';
import { Component } from '../../js/modules/Component';
import { RESUME, VACANCY } from '../../js/modules/events';
import { ShortVacancyComponent } from '../ShortVacancy/ShortVacancy';
import { ShortResumeComponent } from '../ShortResume/ShortResume';

export class PopularComponent extends Component {
  constructor (data, globalEventBus) {
    super({ data, template, globalEventBus });

    this._globalEventBus.subscribeToEvent(RESUME.getResumesSuccess, this.showItems.bind(this));
    this._globalEventBus.subscribeToEvent(VACANCY.getVacanciesSuccess, this.showItems.bind(this));
    this._globalEventBus.subscribeToEvent(VACANCY.getVacanciesRecommendedSuccess, this.showItems.bind(this));
  }

  onFirstRender () {
    if (this.getRole === 'seeker') {
      this._globalEventBus.triggerEvent(VACANCY.getVacanciesRecommended);
    }
    if(this.getRole === 'seekerGuest'){
      this._globalEventBus.triggerEvent(VACANCY.getVacancies);
    }
    if (this.getRole === 'employer' || this.getRole === 'employerGuest') {
      this._globalEventBus.triggerEvent(RESUME.getResumes);
    }
  }

  onRender () {
    if (this.data.items) {
      if (this.getRole === 'seeker' || this.getRole === 'seekerGuest') {
        this.data.items.forEach((vacancy, count) => {
          if (count < 15) {
            let shortVacancyComponent = new ShortVacancyComponent({
              data: {
                vacancy,
                role: this.getRole
              },
              globalEventBus: this._globalEventBus
            });
            shortVacancyComponent.appendTo(this.list);
          }
        });
      }
      if (this.getRole === 'employer' || this.getRole === 'employerGuest') {
        this.data.items.forEach(resume => {
          let shortResumeComponent = new ShortResumeComponent(resume);
          shortResumeComponent.appendTo(this.list);
        });
      }
    }
  }

  showItems (items) {
    this.merge({ items });
    this.update();
  }

  get list () {
    return this.domElement.querySelector('.js-list');
  }
}
