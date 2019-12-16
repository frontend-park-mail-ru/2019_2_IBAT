import template from './searchBar.pug';
import { Component } from '../../js/modules/Component';
import { SEARCH } from '../../js/modules/events';

const shema = {
  'vacancy': {
    mode: 'vacancy',
    url: '/vacancies'
  },
  'resume': {
    mode: 'resume',
    url: '/resumes'
  },
  'company': {
    mode: 'company',
    url: '/companies'
  }
}

export class SearchBarComponent extends Component {
  constructor (data, globalEventBus) {
    super({ data, template, globalEventBus });
  }

  onRender () {
    let role = localStorage.getItem('role');
    this.domElement.querySelector('.search-bar__button')
      .addEventListener('click', (ev) => {
        const query = '?position=' + this.domElement.querySelector('[name="query"]').value;
        switch (role) {
          case 'seeker':
            this._globalEventBus.triggerEvent(SEARCH.search, `${shema.vacancy.url}${query}`);
            break;
          case 'employer':
            this._globalEventBus.triggerEvent(SEARCH.search, `${shema.resume.url}${query}`);
            break;
          case 'employerGuest':
            this._globalEventBus.triggerEvent(SEARCH.search, `${shema.resume.url}${query}`);
            break;
          default:
            this._globalEventBus.triggerEvent(SEARCH.search, `${shema.vacancy.url}${query}`);
            break;
        }
      });
  };
}
