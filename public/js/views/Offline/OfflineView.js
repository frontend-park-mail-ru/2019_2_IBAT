import template from './offline.pug';
import { View } from '../../modules/view';

export class OfflineView extends View {
  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);
  }

  render () {
    super.render();
  }
}
