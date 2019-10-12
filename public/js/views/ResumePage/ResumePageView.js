import template from './resumePage.pug';
import { View } from '../../modules/view';

export class ResumePageView extends View {

  constructor (root, eventBus) {
    super(root, template, eventBus);

    this._eventBus.subscribeToEvent('loadResumeSuccess', this._onLoadResumeSuccess.bind(this));
  }

  render (data = {}) {
    this._eventBus.triggerEvent('loadResume', data);
    // super.render(data);
  }

  _onLoadResumeSuccess(data){
    super.render(data);
  }
}
