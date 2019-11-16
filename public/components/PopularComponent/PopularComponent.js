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
  }

  onFirstRender () {
    if (this.data.role === 'seeker' || this.data.role === 'seekerGuest') {
      this._globalEventBus.triggerEvent(VACANCY.getVacancies);
    }
    if (this.data.role === 'employer' || this.data.role === 'employerGuest') {
      this._globalEventBus.triggerEvent(RESUME.getResumes);
    }
  }

  onRender () {
    if (this.data.items) {
      if (this.data.role === 'seeker' || this.data.role === 'seekerGuest') {
        this.data.items.forEach(vacancy => {
          const shortVacancyComponent = new ShortVacancyComponent({vacancy, globalEventBus: this._globalEventBus} );
          shortVacancyComponent.appendTo(this.list);
        });
      }
      if (this.data.role === 'employer' || this.data.role === 'employerGuest') {
        this.data.items.forEach(resume => {
          const shortResumeComponent = new ShortResumeComponent(resume);
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
