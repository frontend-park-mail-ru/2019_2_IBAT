import template from './searchPage.pug';
import { View } from '../../modules/view';
import { Api } from '../../modules/api';
import { AUTH, VACANCY, COMPANY, RESUME } from '../../modules/events';

const type_of_employment = [
  'Полная занятость', 'Частичная занятость', 'Проектная/Временная работа', 'Волонтерство', 'Стажировка'
];

const work_schedule = [
  'Полный день', 'Сменный график', 'Гибкий график', 'Удаленная работа', 'Вахтовый метод'
];

const experience = [
  'Не имеет значения', 'Нет опыта', 'От 1 года до 3 лет', 'От 3 до 6 лет', 'Более 6 лет'
]

const education = [
  'Бакалавр', 'Магистр', 'Кандидат наук', 'Доктор наук', 'Неоконченное выысшее', 'Среднее', 'Среднее специальное'
]

export class SearchView extends View {

  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);

    this._searchParametrs = {};
    this._globalEventBus.subscribeToEvent(COMPANY.searchSuccess, this._onFounedCompanies.bind(this));

    Api.getTags()
      .then(res => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          throw res.json();
        }
      })
      .then(tags => { console.log(tags); this._tags = tags; })
      .catch(error => {
        console.error(error);
      });
  }

  render (data = {}) {
    console.log(this._tags);

    data = { ...data, type_of_employment, work_schedule, experience, education };

    console.log(data['mode']);
    this._mode = data['mode'];
    this._globalEventBus.triggerEvent(AUTH.checkAuth);

    super.render(data);

    this._searchForm = this._root.querySelector('.search-js');
    this._searchForm.addEventListener('submit', this._onSubmit.bind(this), false);

    // Если мы кликнули на компанию, перешли на страницу компании, а потом вернулись
    // надо отобразить те же компании
    if (this._companies && this._mode == 'company') {
      this._showCompanies()
    } 
  }

  _onSubmit (ev) {
    ev.preventDefault();

    let data = new Map();
    data['type_of_employment'] = [];
    data['work_schedule'] = [];
    Array.prototype.forEach.call(this._searchForm.elements, elem => {
      if (elem.tagName == 'SELECT' || elem.tagName == 'INPUT') {
        if (elem.type == 'checkbox' && elem.checked) {
          if (type_of_employment.find(item => item == elem.name)) {
            data['type_of_employment'].push(elem.name);
          }
          if (work_schedule.find(item => item == elem.name)) {
            console.log(data);
            data['work_schedule'].push(elem.name);
          }
        } else if (elem.type != 'checkbox') {
          data[elem.name] = elem.value;
        }
      }
    });

    this._searchParametrs = data;
    console.log(this._searchParametrs);
    switch (this._mode) {
      case 'vacancy':
        this._globalEventBus.triggerEvent(VACANCY.search, this._searchParametrs);
      case 'company':
        this._globalEventBus.triggerEvent(COMPANY.search, this._searchParametrs);
      case 'resume':
        this._globalEventBus.triggerEvent(RESUME.search, this._searchParametrs);
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
