import template from './companiesListComponent.pug';
import { Component } from '../../js/modules/Component';
import { COMPANY } from '../../js/modules/events';

export class CompaniesListComponent extends Component {
  constructor (data, globalEventBus) {
    super({ data, template, globalEventBus });

    this._globalEventBus.triggerEvent(COMPANY.getPopularCompanies);
    globalEventBus.subscribeToEvent(COMPANY.getPopularCompaniesSuccess, this.showCompanies.bind(this));
  }

  onFirstRender () {
  }

  showCompanies (data) {
    this.merge(data);
    this.update();
  }
}
