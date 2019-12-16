import template from './searchPage.pug';
import { View } from '../../modules/view';
import { COMPANY, SEARCH } from '../../modules/events';
import { INPUTS } from '../constInputs';
import tagsModel from '../../models/TagsModel';

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
    url: '/employers'
  }
}

export class SearchView extends View {

  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);

    this._globalEventBus.subscribeToEvent(COMPANY.searchSuccess, this._onFounedCompanies.bind(this));
  }

  render (data = {}) {
    this._tags = tagsModel.getTags();
    console.log(this._tags);
    let spheresFirst = [''];
    Object.entries(this._tags).forEach(([key, value]) => {
      spheresFirst.push(key);
    });

    data = { ...data, INPUTS, spheresFirst };

    this._mode = data['mode'];

    super.render(data);

    this._searchForm = this._root.querySelector('.search-js');
    this._searchForm.addEventListener('submit', this._onSubmit.bind(this), false);

    this._spheresFirst = this._searchForm.querySelector('.search__spheres-first');
    this._spheresSecond = this._searchForm.querySelector('.search__spheres-second');

    if (this._spheresFirst && this._spheresSecond) {
      this._spheresFirst.addEventListener('input', this._onFirstTagChanged.bind(this), false)
    }

    // Если мы кликнули на компанию, перешли на страницу компании, а потом вернулись
    // надо отобразить те же компании
    if (this._companies && this._mode == shema.company.mode) {
      this._showCompanies()
    } 
  }

  _onFirstTagChanged(event) {
    this._spheresSecond.innerHTML = '';
    let secondTags = this._tags[event.target.value] ? this._tags[event.target.value] : [];
    this._renderSecondTags(secondTags);
  }

  _renderSecondTags(tags) {
    tags.forEach(tag => {
      this._createSecondTag(tag);      
    })
  }

  _createSecondTag(tagName) {
    let tag = document.createElement('div');
      tag.classList.add('search__item');

      let input = document.createElement('input');
      input.type = 'checkbox';
      input.value = tagName;
      tag.appendChild(input);

      let name = document.createElement('span');
      name.classList.add('ml5');
      name.innerHTML = tagName;
      tag.appendChild(name);

      this._spheresSecond.appendChild(tag);
  }

  _onSubmit (ev) {
    ev.preventDefault();

    let getParameters = '?';

    Array.prototype.forEach.call(this._searchForm.elements, elem => {
      if (elem.tagName == 'SELECT' || elem.tagName == 'INPUT') {
        if (elem.type == 'checkbox' && elem.checked) {
          if (INPUTS.type_of_employment.find(item => item == elem.name)) {
            getParameters += `type_of_employment=${elem.name}&`;
          }
          if (INPUTS.work_schedule.find(item => item == elem.name)) {
            getParameters += `work_schedule=${elem.name}&`;
          }
          if (this._tags[this._spheresFirst.value].find(item => item == elem.value)) {
            getParameters += `${this._spheresFirst.value}=${elem.value}`;
          }
        } 
        else if (elem.type != 'checkbox' && elem.value && elem.name != 'spheres') {
          getParameters += `${elem.name}=${elem.value}&`;
        }
      }
    });
    
    console.log(getParameters);

    switch (this._mode) {
      case shema.vacancy.mode:
        this._globalEventBus.triggerEvent(SEARCH.search, `${shema.vacancy.url}${getParameters}`);
        break;
      case shema.resume.mode:
        this._globalEventBus.triggerEvent(SEARCH.search, `${shema.resume.url}${getParameters}`);
        break;
      case shema.company.mode:
        this._globalEventBus.triggerEvent(COMPANY.search, `${shema.company.url}${getParameters}`);
        break;
    }
  }

  _onFounedCompanies (companies = []) {
    this._companies = companies;
    this._showCompanies()
  }

  _showCompanies() {
    console.log(this._companies);
    let container = document.querySelector('.search-company');
    container.innerHTML = '';
    if (this._companies.length) {
      this._companies.forEach(company => {
        let c = document.createElement('div');
        c.className = 'search-company__name';
        c.innerHTML = `<a class="bloko-link" href="/employer/${company.id}">${company.company_name}</a><span font-size="16px"> активных вакансий: ${company.vacancies.length}</span?`
        container.appendChild(c);
      })
    } else {
        let msg = document.createElement('div');
        msg.className = 'search-company__name';
        msg.innerHTML = 'Ничего не найдено';
        container.appendChild(msg);
    }
  }
}
