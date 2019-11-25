import template from './signupmenu.pug';

export class SignupMenuComponent{
    constructor (parent = document.body, data = {}) {
        this._parent = parent;
        this.data = data;
    }

    render () {
        this._parent.innerHTML = template(this.data);
    }
}
