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

    this._createResumeForm = this._root.querySelector('.create-resume-form');
    this._createResumeForm.addEventListener('submit', this._onSubmit.bind(this), false);
  }

  _onSubmitFailed (data) {
    let login = this._signupForm.querySelector('[name="login"]');
    let error = login.nextElementSibling;
    View._addInputError(login, error, data.error);
  }

  _onSubmit (ev) {
    ev.preventDefault();
    let wasfail = false;

    let inputs = this._createResumeForm.querySelectorAll('.input');
    wasfail = View._validateObligotaryInputs(inputs);
    
    if (!wasfail) {
      const resume = {};
      Array.prototype.forEach.call(this._createResumeForm.elements, elem=>{
        resume[elem.name]=elem.value;
      });
      this._eventBus.triggerEvent('createResume', resume);
    }
  }
}
