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
    console.log("Router:route -> routePath ", routePath);

    //TODO костыль, переделать под нормальный роутинг для /vacancy/{id}
    if (this.routes.has(routePath)) {
      const view = this.routes.get(routePath);
      console.log('Router:route -> view ', view);

      const id = this._extractIdFromPath(path);
      console.log('Router:route -> id ', id);

      data = { id, ...data };
      console.log('Router:route -> data', data);

      view.render(data);
      this.currentRoute = path;
    } else {
      if (this.routes.has(path)) {
        console.log('Router:route -> path ', path);
        const view = this.routes.get(path);
        console.log('Router:route -> view ', view);
        console.log('Router:route -> data', data);
  
        view.render(data);
        this.currentRoute = path;
      }
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

    console.log('Router:start -> root', this.root);
    console.log('Router:start -> routes', this.routes);

    window.addEventListener('click', (ev) => {
      if (ev.target.tagName === 'A') {
        ev.preventDefault();
        console.log('Router:start -> root ', Router._normalizePath(ev.target.pathname))
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
