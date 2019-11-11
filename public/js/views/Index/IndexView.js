import template from './index.pug';
import { View } from '../../modules/view';
import { ShortVacancyComponent } from '../../../components/ShortVacancy/ShortVacancy';
import { ShortResumeComponent } from '../../../components/ShortResume/ShortResume';
import { AUTH, RESUME, VACANCY } from '../../modules/events';

export class IndexView extends View {
  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);

    this._globalEventBus.subscribeToEvent(AUTH.checkAuthResponse, this._onAuthResponse.bind(this));
    this._globalEventBus.subscribeToEvent(VACANCY.getVacanciesSuccess, this._onGetVacanciesSuccess.bind(this));
    this._globalEventBus.subscribeToEvent(RESUME.getResumesSuccess, this._onGetResumesSuccess.bind(this));
  }

  render (data = {}) {
    super.render(data);
    this._globalEventBus.triggerEvent(AUTH.checkAuth);
  }

  /**
   * Получает данные авторизации(роль юзера) и запрашивает нужные данные в зависимости от роли
   * @param data
   * @private
   */
  _onAuthResponse (data) {
    if(this.isViewClosed){
      return;
    }
    switch (data.role) {
      case 'employer': {
        this._globalEventBus.triggerEvent(RESUME.getResumes);
        break;
      }
      case 'seeker': {
        this._globalEventBus.triggerEvent(VACANCY.getVacancies);
        break;
      }
      default: {
        this._globalEventBus.triggerEvent(VACANCY.getVacancies);
        break;
      }
    }
  }

  /**
   * Получает вакансии от модели и отображает списком
   * @param vacancies
   * @private
   */
  _onGetVacanciesSuccess (vacancies) {
    const left_column = document.createElement('div');
    left_column.classList.add('left-column');
    const list = document.createElement('div');
    list.className = 'list';

    left_column.appendChild(list);
    this._root.appendChild(left_column);

    console.log('INDEX:onGetVacanciesSuccess', vacancies);
    if (vacancies) {
      vacancies.forEach(vacancy => {
        new ShortVacancyComponent(vacancy).appendToList(list);
      });
    }
  }

  /**
   * Получает резюме от модели и отображает списком
   * @param resumes
   * @private
   */
  _onGetResumesSuccess (resumes) {
    const left_column = document.createElement('div');
    left_column.classList.add('left-column');
    const list = document.createElement('div');
    list.className = 'list';

    left_column.appendChild(list);
    this._root.appendChild(left_column);

    console.log('INDEX:onGetResumesSuccess', resumes);
    if (resumes) {
      resumes.forEach(resume => {
        new ShortResumeComponent(resume).appendToList(list);
      });
    }
  }
}
