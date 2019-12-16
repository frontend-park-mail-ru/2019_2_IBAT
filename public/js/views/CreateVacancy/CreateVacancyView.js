import template from './createVacancy.pug';
import { View } from '../../modules/view';
import { AUTH, PROFILE, VACANCY } from '../../modules/events';
import { INPUTS } from '../constInputs';
import tagsModel from '../../models/TagsModel';

export class CreateVacancyView extends View {

  constructor (root, eventBus) {
    super(root, template, eventBus);

    this._globalEventBus.subscribeToEvent(AUTH.checkAuthResponse, this._onAuthResponse.bind(this));
    this._globalEventBus.subscribeToEvent(PROFILE.loadProfileSuccess, this._onLoadProfileSuccess.bind(this));
    this._globalEventBus.subscribeToEvent(VACANCY.createVacancyFailed, this._onSubmitFailed.bind(this));
  }

  render (data = {}) {
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
    let tags = this._getFirstTags();

    data = { ...data, INPUTS, tags };
    super.render(data);

    this._createVacancyForm = this._root.querySelector('.vacancy-form');
    this._spheresFirst = this._createVacancyForm.querySelector('.search__spheres-first');
    this._spheresSecond = this._createVacancyForm.querySelector('.search__spheres-second');

    this._createVacancyForm.addEventListener('submit', this._onSubmit.bind(this), false);
    this._spheresFirst.addEventListener('input', this._onFirstTagChanged.bind(this), false);
  }

  /**
   * Обработчик изменения тега первого уровня
   * @param {Event} event
   * @private
   */
  _onFirstTagChanged(event) {
    this._spheresSecond.innerHTML = '';
    let secondTags = this._tags[event.target.value] ? this._tags[event.target.value] : [];
    this._renderSecondTags(secondTags);
  }

  /**
   * Отображение тегов второго уровня
   * @param {Object} tags
   * @private
   */
  _renderSecondTags(tags) {
    tags.forEach(tag => {
      this._createSecondTag(tag);      
    })
  }

  /**
   * Теги первого уровня
   * @returns {Object}
   * @private
   */
  _getFirstTags() {
    this._tags = tagsModel.getTags();
    
    let firstTags = [''];
    Object.entries(this._tags).forEach(([key, value]) => {
      firstTags.push(key);
    });
    
    return firstTags;
  }

  /**
   * Создание тега второго уровня
   * @param {String} tagName
   * @private
   */
  _createSecondTag(tagName) {
    let tag = document.createElement('div');
      tag.classList.add('search__item');

      let input = document.createElement('input');
      input.type = 'checkbox';
      input.value = tagName;
      tag.appendChild(input);

      let name = document.createElement('span');
      name.classList.add('ml5');
      name.innerHTML = tagName;
      tag.appendChild(name);

      this._spheresSecond.appendChild(tag);
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
   * Тэги, выбранные пользователм
   * @returns {Array}
   * @private
   */
  _getChosenSpheres() {
    let spheres = [];
    let checkboxes = this._createVacancyForm.querySelectorAll('input[type="checkbox"]');

    if (checkboxes) {
      checkboxes.forEach(elem => {
        if (elem.checked) {
          spheres.push({
            "first" : this._spheresFirst.value, 
            "second": elem.value
          })
        }
      });
    }
    return spheres;
  }

  /**
   * Создаем вакансию
   * @param {Event} ev
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
      
      let spheres = this._getChosenSpheres();
      vacancy = {...vacancy, spheres };
      console.log(vacancy);
      this._globalEventBus.triggerEvent(VACANCY.createVacancy, vacancy);
    }
  }
}
