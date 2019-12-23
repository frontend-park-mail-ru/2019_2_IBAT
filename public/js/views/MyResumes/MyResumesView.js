import template from './myResumes.pug';
import { View } from '../../modules/view';
import { ShortResumeComponent } from '../../../components/ShortResume/ShortResume'


export class MyResumesView extends View {
  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);
  }

  render(resumes = []) {
    let data = {
      'number_of_resumes': resumes.length
    };

    super.render(data);

    const list = document.querySelector('.list');

    if (resumes.length > 0) {
      resumes.forEach(resume => {
        new ShortResumeComponent({resume}).appendTo(list);
      });
    }
  }
}
