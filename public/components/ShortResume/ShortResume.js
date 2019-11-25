import template from './shortResume.pug';
import { Component } from '../../js/modules/Component';

export class ShortResumeComponent extends Component {
  constructor (resume = {}, isChooseMode = false, clickEventListener) {
    super({ data: { resume, isChooseMode, clickEventListener }, template });
  }

  onRender () {
    super.onRender();
  }

  onFirstRender () {
    this.domElement.addEventListener('click', ev => {
      this.data.clickEventListener(this.data.resume);
    });
  }

  //todo УБРАТЬ ПОТОМ
  appendToList (element) {
    super.appendTo(element);
  }
}
