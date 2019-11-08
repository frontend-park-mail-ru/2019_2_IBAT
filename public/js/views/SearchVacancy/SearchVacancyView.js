import template from './searchVacancyPage.pug';
import { View } from '../../modules/view';

const type_of_employment = [
  'Полная занятость', 'Частичная занятость', 'Проектная/Временная работа', 'Волонтерство', 'Стажировка' 
]

const work_schedule = [
  'Полный день', 'Сменный график', 'Гибкий график', 'Удаленная работа', 'Вахтовый метод'
]

export class SearchVacancyView extends View {

  constructor (root, eventBus) {
    super(root, template, eventBus);
    this._searchParametrs = {};
  }

  render (data = {}) {
    data['type_of_employment'] = type_of_employment;
    data['work_schedule'] = work_schedule;
    super.render(data);

    this._searchForm = this._root.querySelector('.search');
    this._searchForm.addEventListener('submit', this._onSubmit.bind(this), false);
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
      this._eventBus.triggerEvent('find', this._searchParametrs);
  }
}