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
    let login = this._signupForm.querySelector('[name="login"]');
    let error = login.nextElementSibling;
    View._addInputError(login, error, data.error)
  }

  _onSubmit (ev) {
    ev.preventDefault();
    let wasfail = false;

    let inputs = this._createVacancyForm.querySelectorAll('.input');
    wasfail = View._validateObligotaryInputs(inputs);

    if (!wasfail) {
      const vacancy={};
      Array.prototype.forEach.call(this._createVacancyForm.elements, elem=>{
        vacancy[elem.name]=elem.value;
      });
      this._eventBus.triggerEvent('createVacancy', vacancy);
    }
  }
}
