

const pathsWithId = [
  '/profile',
  '/vacancy',
  '/resume'
]

export class Router {
  constructor (root) {
    this.root = root;
    this.routes = new Map();
    this.currentRoute = null;
  }

  /**
   * Переход на страницу path с нужными даннами data для неё
   * @param {String} path
   * @param {Object} data 
   */
  redirect(path, data = {}) {
    this.route(path, data)
  }

  /**
   * Добавление на path нужный controller
   * @param {String} path
   * @param {Controller} controller
   */
  add (path, controller) {
    this.routes.set(path, controller);
  }

  route (path, data = {}) {
    const currentController = this.routes.get(this.currentRoute);
    if (currentController) {
      currentController.close();
    }

    if (window.location.pathname !== path) {
      window.history.pushState(null, null, path);
    }
    
    const pathWithoutParameters = path.split('?')[0];
    console.log(pathWithoutParameters);
    const routePath = '/' + pathWithoutParameters.split('/')[1];

    //TODO костыль, переделать под нормальный роутинг для /vacancy/{id}
    if (this.routes.has(routePath)) {
      const controller = this.routes.get(routePath);
      
      if(pathsWithId.find(el => el == routePath)) {
        let id = this._extractIdFromPath(path);
        data = { id, ...data };
      }
      console.log('router-> render(data)', data);
      this.currentRoute = path;
      controller.openWithData(data);
    } else {
      if (this.routes.has(pathWithoutParameters)) {
        const controller = this.routes.get(pathWithoutParameters);
        this.currentRoute = path;
        console.log('router-> render(data)', data);
        controller.openWithData(data);
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

    window.addEventListener('click', (ev) => {
      if (ev.target.tagName === 'A') {
        ev.preventDefault();
        this.route(Router._normalizePath(ev.target.pathname));
      }
    }, true);
    
    window.addEventListener('popstate', (event) => {
      if (!history.state.url) return;
      this.route(history.state.url);
    }, false);

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
