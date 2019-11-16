import template from './searchBar.pug'

export class SearchBarComponent{
  constructor(data){
    this._data=data;
  }

  render(){
    return template(this._data);
  }

  renderTo(element){
    element.innerHTML=this.render();

    this.onRender();
  }

  onRender(){

  };
}
