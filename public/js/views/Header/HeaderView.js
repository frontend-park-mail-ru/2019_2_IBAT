import template from './header.pug';
import { View } from '../../modules/view';

export class HeaderView extends View {

  constructor (root, eventBus, globalEventBus) {
    super(root, template, eventBus, globalEventBus);

    this._eventBus.subscribeToEvent('checkAuthResponse', this._onAuthResponse.bind(this));
    this._eventBus.subscribeToEvent('signOutResponse', this._onAuthResponse.bind(this));
    this._globalEventBus.subscribeToEvent('headerLoad', this._onRenderHeader.bind(this));
  }

  render (data = {}) {
    super.render(data);
    this._eventBus.triggerEvent('checkAuth');
  }

  _onRenderHeader (data) {
    //TODO исправить это недоразумение на бэке, отправлять hhRole, что угодно, только не class
    if(data){
      data.hhRole=data.class;
    }
    super.render(data);

    const signOutButton=this._root.querySelector('input[name=signOut]');
    if(signOutButton){
      signOutButton.addEventListener('click',(ev)=>{
        this._eventBus.triggerEvent('signOut')
      });
    }

  }

  _onAuthResponse (data) {
    this._globalEventBus.triggerEvent('headerLoad', data);
  }
}
