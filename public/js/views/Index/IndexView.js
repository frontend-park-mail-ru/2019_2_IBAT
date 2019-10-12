import template from './index.pug';
import { View } from '../../modules/view';
import { ShortVacancyComponent } from '../../../components/ShortVacncy/ShortVacancy';
import { ShortResumeComponent } from '../../../components/ShortResume/ShortResume';

export class IndexView extends View {
  constructor(root, eventBus, globalEventBus) {
    super(root, template, eventBus, globalEventBus);

    this._eventBus.subscribeToEvent('getVacanciesSuccess', this._onGetVacanciesSuccess.bind(this));
    this._eventBus.subscribeToEvent('getResumesSuccess', this._onGetResumesSuccess.bind(this));
    this._eventBus.subscribeToEvent('checkAuthResponse', this._onAuthResponse.bind(this));
  }

  render(data = {}) {
    super.render(data);

    this._eventBus.triggerEvent('checkAuth');
  }

  _onGetVacanciesSuccess(vacancies) {
    const list = document.createElement('div');
    list.className = 'list';
    this._root.appendChild(list);

    if (vacancies) {
      Object.entries(vacancies).forEach(([vacancyId, vacancy]) => {
        new ShortVacancyComponent({ vacancyId, vacancy }).appendToList(list);
      });
    }
  }

  _onGetResumesSuccess(resumes) {
    const list = document.createElement('div');
    list.className = 'list';
    this._root.appendChild(list);

    if (resumes) {
      Object.entries(resumes).forEach(([resumeId, resume]) => {
        new ShortResumeComponent({ resumeId, resume }).appendToList(list);
      });
    }
  }

  _onAuthResponse(data) {
    this._role = data.role;

    switch (this._role) {
      case 'employer': {
        this._eventBus.triggerEvent('getResumes');
        break;
      }
      case 'seeker': {
        this._eventBus.triggerEvent('getVacancies');
        break;
      }
      default: {
        this._eventBus.triggerEvent('getVacancies');
        break;
      }
    }
  }
}
