import template from './foundResumes.pug';
import { View } from '../../modules/view';
import { ShortResumeComponent } from '../../../components/ShortResume/ShortResume';
import { ACTIONS } from '../../modules/events';

export class FoundResumesView extends View {

  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);
  }

  render (resumes = {}) {
    // Если мы пришли сюда из поиска, то это массив, а если мы вернулись назад на найденные
    // то вакансии не прокинутся и мы отрендерим старые(чтобы по 500 раз не искать одно и тоже)
    if (Array.isArray(resumes)) {
      this._resumes = resumes;
    }

    let data = {
      'number_of_resumes': this._resumes.length
    };

    super.render(data);

    const list = document.querySelector('.list');

    if (this._resumes.length > 0) {
      this._resumes.forEach(resume => {
        console.log(resume);
        new  ShortResumeComponent(resume).appendTo(list);
      });
    }
  }
}
