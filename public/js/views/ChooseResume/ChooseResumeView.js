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
   * @param {Object} data
   */
  render (data = {}) {
    this.vacancy_id = data.vacancyId;
    this._globalEventBus.triggerEvent(AUTH.checkAuth);
    this._globalEventBus.triggerEvent(RESUME.getOwnResumes);
  }

  /**
   * Получает резюме от модели и отображает списком
   * @param {Array} resumes
   * @private
   */
  _onGetOwnResumesSuccess (resumes = []) {
    let data = {
      'number_of_resumes': resumes.length
    };
    super.render(data);
    
    const list = document.querySelector('.list');

    if (resumes.length) {
      resumes.forEach(resume => {
        this._showChoice(resume, list);
      });
      document.querySelector('form').addEventListener('submit', this._onSubmit.bind(this));
    }
  }

  _onSubmit(event) {
    event.preventDefault();
    let chosen = document.querySelector('input[name="resume"]:checked');
    if (chosen) {
      console.log(this.vacancy_id);
      this._globalEventBus.triggerEvent(RESPOND.respondToVacancy, {
        resume_id: chosen.value,
        vacancy_id: this.vacancy_id,
      });
    }
  }

  _onRespondToVacancyFailed () {
    //
  }

  /**
   *
   * @param {Object} resume
   * @param {HTMLDivElement} list
   * @private
   */
  _showChoice(resume = {}, list) {
    let choice = document.createElement('div');
    choice.classList.add('choice');

    let radio = document.createElement('input');
    radio.classList.add('choice__radio')
    radio.type = 'radio';
    radio.name = 'resume';
    radio.value = resume.id;
    choice.appendChild(radio);

    let card = document.createElement('div');
    card.classList.add('choice__card');
    choice.appendChild(card);

    new ShortResumeComponent({resume}).appendTo(card);
    list.appendChild(choice);
  }
}
