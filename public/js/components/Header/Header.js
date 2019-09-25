import template from './header.pug';

const pug = require('pug');

export class HeaderComponent {
  constructor (parent = document.body, data = {}) {
    this._parent = parent;
    this._data = data;
  }

  // get data () {
  //   return this._data;
  // }
  //
  // set data (dataToSet) {
  //   this._data = { ...dataToSet };
  // }

  render () {
    this._parent.innerHTML = pug.compile(template)(
      this._data
    );
  }

}
