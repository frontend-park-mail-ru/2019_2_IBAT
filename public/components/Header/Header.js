import template from './header.pug';

export class HeaderComponent {
  constructor (parent = document.body, data = {}) {
    this._parent = parent;
    this._data = data;
  }

  render () {
    this._parent.innerHTML = template(this._data)
  }

}
