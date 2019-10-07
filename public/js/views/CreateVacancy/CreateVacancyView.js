import template from './createVacancy.pug';
import { View } from '../../modules/view';
import Validation from '../../modules/validation';

export class CreateVacancyView extends View {

  constructor (root, eventBus) {
    super(root, template, eventBus);

    this._eventBus.subscribeToEvent('createFailed', this._onSubmitFailed.bind(this));
  }

  render (data = {}) {
    super.render(data);

    this._createVacancyForm = this._root.querySelector('.vacancy-form');
    this._createVacancyForm.addEventListener('submit', this._onSubmit.bind(this), false);
  }

  _onSubmitFailed (data) {
    const login = this._signupForm.querySelector('[name="login"]');
    login.classList.add('invalid');

    const error = login.nextElementSibling;
    error.innerHTML = data.error;
  }

  _onSubmit (ev) {
    ev.preventDefault();
    let wasfail = false;

    const inputs = this._createVacancyForm.querySelectorAll('.input');
    inputs.forEach(input => {
      if (Validation.isEmptyField(input.value)) {
        const error = input.nextElementSibling;
        error.innerHTML = 'Обязательное поле';
        error.className = 'error active';
        input.className = 'input invalid';
        wasfail = true;
      } else {
        const error = input.nextElementSibling;
        error.innerHTML = '';
        error.className = 'error';
        input.className = 'input';
      }
    });

    if (!wasfail) {
      const vacancy={};
      Array.prototype.forEach.call(this._createVacancyForm.elements, elem=>{
        vacancy[elem.name]=elem.value;
      });
      this._eventBus.triggerEvent('createVacancy', vacancy);
    }
  }
}
