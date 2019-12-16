import { Component } from '../../js/modules/Component';
import template from './notification.pug';
import { ACTIONS } from '../../js/modules/events';

export class NotificationComponent extends Component {
  constructor (notification, globalEventBus) {
    super({ notification, template, globalEventBus });
  }

  onFirstRender () {
    this.domElement.addEventListener('click', ev => {
      const path = this.data.params.role === 'seeker' ?
        `/vacancy/${this.data.params.link}` :
        `/resume/${this.data.params.link}`;
      this._globalEventBus.triggerEvent(ACTIONS.goTo, { path });
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
