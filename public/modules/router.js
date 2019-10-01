import {Api} from "./api";

export default class Router {
    constructor(root) {
        this.root = root;
        this.routes = new Map();
        this.currentRoute = null;
    }

    toStartPage() {
        this._change("/");
    }

    add(path, view) {
        this.routes.set(path, view);
    }

    _change(path) {

        if (this.routes.has(path)) {

            const currentPage = this.routes.get(this.currentRoute);
            if (currentPage) this.root.innerHTML = '';

            const page = this.routes.get(path);
            page.render(this.root);

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
                this._change(Router._normalizePath(ev.target.pathname));
            }
        });

        this._change(Router._normalizePath(window.location.pathname));
    }
}
