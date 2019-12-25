import template from './shortResume.pug';
import { Component } from '../../js/modules/Component';

export class ShortResumeComponent extends Component {
  constructor (resume = {}) {
    super({ data: resume, template });
  }
}
