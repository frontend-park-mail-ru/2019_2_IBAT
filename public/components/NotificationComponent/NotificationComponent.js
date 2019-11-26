import { Component } from '../../js/modules/Component';
import template from './notification.pug';
import { ACTIONS } from '../../js/modules/events';

export class NotificationComponent extends Component {
  constructor (data, globalEventBus) {
    super({ data, template, globalEventBus });
  }

  onFirstRender () {
    this.domElement.addEventListener('click', ev =>{
      this._globalEventBus.triggerEvent(ACTIONS.goTo, {path: `/vacancy/${this.data.vacancyId}`})
      this.domElement.parentElement.removeChild(this.domElement);
    });

    this.closeButton.addEventListener('click', ev => {
      this.domElement.parentElement.removeChild(this.domElement);
      ev.stopPropagation();
    });
  }

  get closeButton () {
    return this.domElement.querySelector('[name=closeNotification]');
  }
}
