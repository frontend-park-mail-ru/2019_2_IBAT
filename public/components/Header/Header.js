import template from './header.pug';
import './header.css'

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
    this._parent.innerHTML = template(this._data)
  }

}
