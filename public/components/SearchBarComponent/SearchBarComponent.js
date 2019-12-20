import template from './searchBar.pug';
import { Component } from '../../js/modules/Component';
import { SEARCH } from '../../js/modules/events';

export class SearchBarComponent extends Component {
  constructor (data, globalEventBus) {
    super({ data, template, globalEventBus });
  }

  onRender () {
    this.domElement.querySelector('.search-bar__form')
      .addEventListener('submit', (ev) => {
        ev.preventDefault();
        const what = this.domElement.querySelector('[name="mode"]').value;
        let fieldName = '';
        if (what != '/employers') {
          fieldName = 'position';
        } else {
          fieldName = 'company_name';
        }
        const query = '?' + fieldName + '=' + this.domElement.querySelector('[name="query"]').value;
        this._globalEventBus.triggerEvent(SEARCH.search, `${what}${query}`);
      });
  };
}
