import { HeaderComponent } from './components/Header/Header.js';
import { Api } from '../../modules/api.js';

class MainPage {

    constructor(){
        Api.checkSession()
            .then(response => {
                if(response.status>=300){
                    throw new Error("Неверный статус");
                }
                response.json();
            })
            .then(data=>{
                this._data=data.class;
                render();
            })
            .catch(err=>{
                if(err.status==401){
                    this._data='anonymous';
                }
                console.error(err);
            })
    }
    
    render(){
        new HeaderComponent().render();
    }

    _checkSession(){
        
    }
}




// document.addEventListener('DOMContentLoaded', () => {
//     const page = document.querySelector('.page');
//     const header = document.createElement('header');

//     header.classList.add('header');

//     const data = { hhRole: getCookie('hh_role') };
//     new HeaderComponent(header, data).render();
//     page.appendChild(header);
// });