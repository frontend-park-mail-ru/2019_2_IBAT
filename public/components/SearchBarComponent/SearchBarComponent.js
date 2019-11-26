import template from './searchBar.pug';
import { Component } from '../../js/modules/Component';
import { VACANCY, RESUME } from '../../js/modules/events';

export class SearchBarComponent extends Component {
  constructor (data, globalEventBus) {
    super({ data, template, globalEventBus });
  }

  onRender () {
    let role = localStorage.getItem('role');
    this.domElement.querySelector('.search-bar__button')
      .addEventListener('click', (ev) => {
        const query = this.domElement.querySelector('[name="query"]').value;
        switch (role) {
          case 'seeker':
            this._globalEventBus.triggerEvent(VACANCY.search, { position: query });
          case 'employer':
            this._globalEventBus.triggerEvent(RESUME.search, { position: query });
          case 'employerGuest':
            this._globalEventBus.triggerEvent(RESUME.search, { position: query });
          default:
            this._globalEventBus.triggerEvent(VACANCY.search, { position: query });
        }
      });
  };
}
