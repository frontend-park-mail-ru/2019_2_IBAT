export class View {
  constructor (root, template, eventBus, globalEventBus) {
    this._root = root;
    this._eventBus = eventBus;
    this._globalEventBus = globalEventBus;
    this._template = template;
  }

  render (data) {
    this._root.innerHTML = this._template(data);
  }

  hide () {
    this._root.innerHTML = '';
  }
}
