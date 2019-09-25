import '../css/index.css'
import { HeaderComponent } from './components/Header/Header.js';

const application = document.getElementById('application');

const menuItems = {
  signupseeker: 'Регистрация соискателя',
  signupemplyer: 'Регистрация работадателя',
  signin: 'Авторизация',
  profile: 'Профиль',
  createresume: 'Создать резюме',
  createvacancy: 'Создать вакансию'
};

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('.page');
  const header = document.createElement('header');

  header.classList.add('header');

  const data = { hhRole: getCookie('hh_role') };
  new HeaderComponent(header,data).render();
  page.appendChild(header);
});

function getCookie (name) {
  let matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
