import template from './createResume.pug';
import { View } from '../../modules/view';
import { AUTH, PROFILE, RESUME, VACANCY } from '../../modules/events';
import { INPUTS } from '../constInputs';

export class CreateResumeView extends View {

  constructor (root, eventBus) {
    super(root, template, eventBus);

    this._globalEventBus.subscribeToEvent(AUTH.checkAuthResponse, this._onAuthResponse.bind(this));
    this._globalEventBus.subscribeToEvent(PROFILE.loadProfileSuccess, this._onLoadProfileSuccess.bind(this));
    this._globalEventBus.subscribeToEvent(RESUME.createResumeFailed, this._onSubmitFailed.bind(this));
  }

  render (data = {}) {
    this.isViewClosed = false;

    this._globalEventBus.triggerEvent(AUTH.checkAuth);
  }

  /**
   * Загружаем профиль юзера для автозаполнения данных формы резюме
   * @param data
   * @private
   */
  _onLoadProfileSuccess (data = {}) {
    if (this.isViewClosed) {
      return;
    }
    data = { ...data, INPUTS };
    super.render(data);

    this._createResumeForm = this._root.querySelector('.create-resume-form');
    this._createResumeForm.addEventListener('submit', this._onSubmit.bind(this), false);
  }

  /**
   * Получаем данные авторизации и загружаем профиль
   * @param data
   * @private
   */
  _onAuthResponse (data) {
    if (this.isViewClosed) {
      return;
    }
    this._globalEventBus.triggerEvent(PROFILE.loadProfile);
  }

  /**
   * Ошибка создания резюме
   * @param data
   * @private
   */
  _onSubmitFailed (data) {
    let login = this._signupForm.querySelector('[name="login"]');
    let error = login.nextElementSibling;
    View._addInputError(login, error, data.error);
  }

  /**
   * Создаем резюме
   * @param ev
   * @private
   */
  _onSubmit (ev) {
    ev.preventDefault();
    let wasfail = false;

    let inputs = this._createResumeForm.querySelectorAll('.input');
    wasfail = View._validateObligotaryInputs(inputs);

    if (!wasfail) {
      const resume = {};
      Array.prototype.forEach.call(this._createResumeForm.elements, elem => {
        resume[elem.name] = elem.value;
      });
      this._globalEventBus.triggerEvent(RESUME.createResume, resume);
    }
  }
}
