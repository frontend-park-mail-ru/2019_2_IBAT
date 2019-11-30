import template from './myResumes.pug';
import { View } from '../../modules/view';


export class MyResumesView extends View {
  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);
  }
}
