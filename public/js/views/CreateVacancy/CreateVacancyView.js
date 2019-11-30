import template from './createVacancy.pug';
import { View } from '../../modules/view';
import { AUTH, PROFILE, VACANCY } from '../../modules/events';

const type_of_employment = [
  'Полная занятость', 'Частичная занятость', 'Проектная/Временная работа', 'Волонтерство', 'Стажировка'
];

const work_schedule = [
  'Полный день', 'Сменный график', 'Гибкий график', 'Удаленная работа', 'Вахтовый метод'
];

const experience = [
  'Не имеет значения', 'Нет опыта', 'От 1 года до 3 лет', 'От 3 до 6 лет', 'Более 6 лет'
]

export class CreateVacancyView extends View {

  constructor (root, eventBus) {
    super(root, template, eventBus);

    this._globalEventBus.subscribeToEvent(AUTH.checkAuthResponse, this._onAuthResponse.bind(this));
    this._globalEventBus.subscribeToEvent(PROFILE.loadProfileSuccess, this._onLoadProfileSuccess.bind(this));
    this._globalEventBus.subscribeToEvent(VACANCY.createVacancyFailed, this._onSubmitFailed.bind(this));
  }

  render (data = {}) {
    data = { ...data, type_of_employment, work_schedule, experience };
    this.isViewClosed = false;

    this._globalEventBus.triggerEvent(AUTH.checkAuth);
  }

  /**
   * Загружаем профиль юзера для автозаполнения данных формы вакансии
   * @param data
   * @private
   */
  _onLoadProfileSuccess (data) {
    if (this.isViewClosed) {
      return;
    }
    data = { ...data, type_of_employment, work_schedule, experience };
    super.render(data);

    this._createVacancyForm = this._root.querySelector('.vacancy-form');
    this._createVacancyForm.addEventListener('submit', this._onSubmit.bind(this), false);
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
   * Ошибка создания вакансии
   * @param data
   * @private
   */
  _onSubmitFailed (data) {
    let login = this._signupForm.querySelector('[name="login"]');
    let error = login.nextElementSibling;
    View._addInputError(login, error, data.error);
  }

  /**
   * Создаем вакансию
   * @param ev
   * @private
   */
  _onSubmit (ev) {
    ev.preventDefault();
    let wasfail = false;

    let inputs = this._createVacancyForm.querySelectorAll('.input');
    wasfail = View._validateObligotaryInputs(inputs);

    if (!wasfail) {
      let vacancy = {};
      Array.prototype.forEach.call(this._createVacancyForm.elements, elem => {
        vacancy[elem.name] = elem.value;
      });
      console.log(vacancy);
      this._globalEventBus.triggerEvent(VACANCY.createVacancy, vacancy);
    }
  }
}
