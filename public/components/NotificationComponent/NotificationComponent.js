import { Component } from '../../js/modules/Component';
import template from './notification.pug';
import { ACTIONS } from '../../js/modules/events';

export class NotificationComponent extends Component {
  constructor (notification, globalEventBus) {
    super({ data: notification, template, globalEventBus });
  }

  onFirstRender () {
    this.domElement.addEventListener('click', ev => {
      this._globalEventBus.triggerEvent(ACTIONS.goTo, { path: this.data.link });
      this.domElement.parentElement.removeChild(this.domElement);
    });

    this.closeButton.addEventListener('click', ev => {
      this.domElement.parentElement.removeChild(this.domElement);
      ev.stopPropagation();
    });
    this.muteButton.addEventListener('click', ev => {
      ev.stopPropagation();
    });
  }

  get closeButton () {
    return this.domElement.querySelector('[name=closeNotification]');
  }

  get muteButton () {
    return this.domElement.querySelector('[name=muteNotification]');
  }
}
