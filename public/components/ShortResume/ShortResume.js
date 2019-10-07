import template from './shortResume.pug';

export class ShortResumeComponent {
  constructor (data = {}) {
    this._data = data;

    this._resume = document.createElement('div');
    this._resume.className = 'card';
    this._resume.innerHTML = template(this._data);
  }

  appendToList (list) {
    list.appendChild(this._resume);
  }
}
