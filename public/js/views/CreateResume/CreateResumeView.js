import template from './createResume.pug';
import { View } from '../../modules/view';
import Validation from '../../modules/validation';

export class CreateResumeView extends View {

  constructor (root, eventBus) {
    super(root, template, eventBus);

    this._eventBus.subscribeToEvent('createFailed', this._onSubmitFailed.bind(this));
  }

  render (data = {}) {
    super.render(data);

    this._createResumeForm = this._root.querySelector('.resume-form');
    this._createResumeForm.addEventListener('submit', this._onSubmit.bind(this), false);
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

    const inputs = this._createResumeForm.querySelectorAll('.input');
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
      const resume = {};
      Array.prototype.forEach.call(this._createResumeForm.elements, elem=>{
        resume[elem.name]=elem.value;
      });
      this._eventBus.triggerEvent('createResume', resume);
    }
  }
}
