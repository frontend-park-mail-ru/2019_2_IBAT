import template from './index.pug';
import { View } from '../../modules/view';

export class IndexView extends View {

  constructor (root) {
    super(root, template);
  }

  render (data = {}) {
    super.render(data);
  }
}
