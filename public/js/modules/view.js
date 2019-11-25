import Validation from '../modules/validation';

export class View {
  constructor (root, template, globalEventBus) {
    this._root = root;
    this._globalEventBus = globalEventBus;
    this._template = template;
    this.isViewClosed = true;
  }

  static _addInputError (input, error, msg = '') {
    if (input) {
      input.classList.add('input_invalid');
    }
    if (error) {
      error.classList.add('error_active');
      error.innerHTML = msg;
    }
  };

  static _validateObligotaryInputs (inputs = {}) {
    let wasfail = false;
    if (inputs) {
      inputs.forEach(input => {
        let error = input.nextElementSibling;
        if (Validation.isEmptyField(input.value)) {
          this._addInputError(input, error, 'Обязательное поле');
          wasfail = true;
        } else {
          this._removeInputError(input, error);
        }
      });
    }
    return wasfail;
  }

  static _removeInputError (input, error) {
    if (input) {
      input.classList.remove('input_invalid');
    }
    if (error) {
      error.classList.remove('error_active');
      error.innerHTML = '';
    }
  }

  render (data) {
    data = { ...data, role: this.getRole };
    this._root.innerHTML = this._template(data);
    this.isViewClosed = false;

    this.onRender();
  }

  onRender () {

  }

  hide () {
    this._root.innerHTML = '';
    this.isViewClosed = true;
  }

  merge (data) {
    this.data = { ...this.data, ...data };
  }

  get getRole () {
    console.log(`role=${localStorage.getItem('role')}`);
    return localStorage.getItem('role');
  }

  set setRole (role) {
    localStorage.setItem('role', role);
  }
}
