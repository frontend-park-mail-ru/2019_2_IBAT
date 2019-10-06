export default class Router {
    constructor(root) {
        this.root = root;
        this.routes = new Map();
        this.currentRoute = null;
    }

    toStartPage() {
        this.route("/");
    }

    add(path, view) {
        this.routes.set(path, view);
    }

    route(path) {
        if (this.currentRoute === path) {
            return;
        }

        const currentView = this.routes.get(this.currentRoute);
        if (currentView){
            currentView.hide();
        }

        if (this.routes.has(path)) {
            const view = this.routes.get(path);
            view.render();
            this.currentRoute = path;
        } else {
            //Error 404
        }
    }

    static _normalizePath(path) {
        return path.charAt(path.length - 1) === '/' && path !== '/' ? path.slice(0, path.length - 1) : path;
    }

    start() {
        this.root.addEventListener('click', (ev) => {
            if (ev.target.tagName === 'A') {
                ev.preventDefault();
                this.route(Router._normalizePath(ev.target.pathname));
            }
        });

        this.route(Router._normalizePath(window.location.pathname));
    }
}
