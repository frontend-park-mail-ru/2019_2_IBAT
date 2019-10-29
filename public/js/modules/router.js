export class Router {
  constructor (root) {
    this.root = root;
    this.routes = new Map();
    this.currentRoute = null;
  }

  toStartPage () {
    this.route('/');
  }

  add (path, view) {
    this.routes.set(path, view);
  }

  route (path, data = {}) {
    const currentView = this.routes.get(this.currentRoute);
    if (currentView) {
      currentView.hide();
    }

    if (window.location.pathname !== path) {
      window.history.pushState(null, null, path);
    }

    const routePath = '/' + path.split('/')[1];
    //TODO костыль, переделать под нормальный роутинг для /vacancy/{id}
    if (this.routes.has(routePath)) {
      const view = this.routes.get(routePath);
      const id = this._extractIdFromPath(path);
      data = { id, ...data };
      view.render(data);
      this.currentRoute = path;
    } else {
      //Error 404
    }
  }

  static _normalizePath (path) {
    return path.charAt(path.length - 1) === '/' && path !== '/' ? path.slice(0, path.length - 1) : path;
  }

  start () {
    window.onpopstate = _ => {
      this.route(window.location.pathname);
    };
    this.root.addEventListener('click', (ev) => {
      if (ev.target.tagName === 'A') {
        ev.preventDefault();
        this.route(Router._normalizePath(ev.target.pathname));
      }
    });

    this.route(Router._normalizePath(window.location.pathname));
  }

  //TODO переделать под нормальный роутинг
  _routesHasPath (path) {

    return Array.from(this.routes.keys()).some(regexKey => regexKey.includes(path));
  }

  //TODO переделать под номрмальный ротуинг
  _getView (path) {
    const key = Array.from(this.routes.keys()).find(regexKey => RegExp(regexKey).test(path));
    return this.routes.get(key);
  }

  _extractIdFromPath (path) {
    return path.split('/').pop();
  }
}
