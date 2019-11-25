import template from './searchBar.pug';
import { Component } from '../../js/modules/Component';
import { VACANCY } from '../../js/modules/events';

export class SearchBarComponent extends Component {
  constructor (data, globalEventBus) {
    super({ data, template, globalEventBus });
  }

  onRender () {
    this.domElement.querySelector('.search-bar__button')
      .addEventListener('click', (ev) => {
        const query = this.domElement.querySelector('[name="query"]').value;
        this._globalEventBus.triggerEvent(VACANCY.search, { position: query });
      });
  };
}
