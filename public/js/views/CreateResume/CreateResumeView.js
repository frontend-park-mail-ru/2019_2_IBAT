import template from './createResume.pug';
import { View } from '../../modules/view';
import { AUTH, PROFILE, RESUME, VACANCY } from '../../modules/events';
import { INPUTS } from '../constInputs';
import tagsModel from '../../models/TagsModel';

export class CreateResumeView extends View {

  constructor (root, eventBus) {
    super(root, template, eventBus);

    this._globalEventBus.subscribeToEvent(AUTH.checkAuthResponse, this._onAuthResponse.bind(this));
    this._globalEventBus.subscribeToEvent(PROFILE.loadProfileSuccess, this._onLoadProfileSuccess.bind(this));
    this._globalEventBus.subscribeToEvent(RESUME.createResumeFailed, this._onSubmitFailed.bind(this));
  }

  render (data) {
    this.isViewClosed = false;
    if (data.id === undefined) {
      this.change_mode = false;
      this._globalEventBus.triggerEvent(AUTH.checkAuth);
    }
    else {
      let tags = this._getFirstTags();
      this.change_mode = true;
      let change_mode = this.change_mode;

      data['wage'] = data['wage'].split('.')[0].replace(/\s/g, '');
      data['birth_date'] = data['birth_date'].split('T')[0];

      this.data = { ...data, INPUTS, tags, change_mode };

      console.log(this.data);
      super.render(this.data);
      this._addEventListeners();
    }
  }

  /**
   * После загрузки данных профиля рендерим
   * @param {Object} data
   * @private
   */
  _onLoadProfileSuccess (data = {}) {
    if (this.isViewClosed) {
      return;
    }
    let tags = this._getFirstTags();

    this.data = { ...data, INPUTS, tags }; 
    super.render(this.data);
    this._addEventListeners();
  }

  _addEventListeners() {
    this._createResumeForm = this._root.querySelector('.create-resume-form');
    this._spheresFirst = this._createResumeForm.querySelector('.search__spheres-first');
    this._spheresSecond = this._createResumeForm.querySelector('.search__spheres-second');

    this._createResumeForm.addEventListener('submit', this._onSubmit.bind(this), false);
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
  _renderSecondTags(tags = {}) {
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
   * Тэги, выбранные пользователм
   * @returns {Array}
   * @private
   */
  _getChosenSpheres() {
    let spheres = [];
    let checkboxes = this._createResumeForm.querySelectorAll('input[type="checkbox"]');

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
   * Создаем резюме
   * @param {Event} ev
   * @private
   */
  _onSubmit (ev) {
    ev.preventDefault();
    let wasfail = false;

    let inputs = this._createResumeForm.querySelectorAll('.input');
    wasfail = View._validateObligotaryInputs(inputs);

    if (!wasfail) {
      let resume = {};
      Array.prototype.forEach.call(this._createResumeForm.elements, elem => {
        resume[elem.name] = elem.value;
      });

      let spheres = this._getChosenSpheres();
      let id = this.data.id;
      resume = {...resume, spheres, id};
      console.log(resume);
      if (this.change_mode) {
        this._globalEventBus.triggerEvent(RESUME.changeResume, resume);
      } else {
        this._globalEventBus.triggerEvent(RESUME.createResume, resume);
      }
    }
  }
}
