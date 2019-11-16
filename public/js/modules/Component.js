export class Component {
  constructor ({ data, template, globalEventBus } = {}) {
    this.data = data;
    this.template = template;
    this._globalEventBus = globalEventBus;
  }

  update () {
    this.renderTo(this.domElement);
  }

  renderTo (element) {
    element.innerHTML = this.render();
    this.domElement = element;

    if (!this.isRendered) {
      this.isRendered = true;
      this.onFirstRender();
    }

    this.onRender();
  }

  appendTo (element) {
    const node = document.createElement('div');
    node.innerHTML = this.render();
    element.appendChild(node);
    this.domElement = element;

    if (!this.isRendered) {
      this.isRendered = true;
      this.onFirstRender();
    }

    this.onRender();
  }

  render () {
    return this.template(this.data);
  }

  onRender () {}

  onFirstRender () {}

  merge (data) {
    this.data = { ...this.data, ...data };
  }
}
