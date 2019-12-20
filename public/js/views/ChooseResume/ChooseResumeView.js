import template from './chooseResume.pug';
import { View } from '../../modules/view';
import { ShortResumeComponent } from '../../../components/ShortResume/ShortResume';
import { AUTH, RESPOND, RESUME } from '../../modules/events';

export class ChooseResumeView extends View {
  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);

    this._globalEventBus.subscribeToEvent(RESUME.getOwnResumesSuccess, this._onGetOwnResumesSuccess.bind(this));
    this._globalEventBus.subscribeToEvent(RESPOND.respondToVacancyFailed, this._onRespondToVacancyFailed.bind(this));
  }

  /**
   * в data хранится vacancyId
   * @param data
   */
  render (data = {}) {
    this._globalEventBus.triggerEvent(AUTH.checkAuth);
    this._globalEventBus.triggerEvent(RESUME.getOwnResumes);
  }

  /**
   * Получает резюме от модели и отображает списком
   * @param resumes
   * @private
   */
  _onGetOwnResumesSuccess (resumes = []) {
    let data = {
      'number_of_resumes': resumes.length
    };
    super.render(data);
    
    const list = document.querySelector('.list');

    console.log('INDEX:onGetResumesSuccess', resumes);
    if (resumes.length) {
      resumes.forEach(resume => {
        new ShortResumeComponent(resume, true, (resume) => {
          this._globalEventBus.triggerEvent(RESPOND.respondToVacancy, {
            resume_id: resume.id,
            vacancy_id: this.data.vacancyId
          });
        }).appendTo(list);
      });
    }
  }

  _onRespondToVacancyFailed () {
    //
  }
}
