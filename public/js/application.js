import css from '../css/index.css';

import { Router } from './modules/router';
import { EventBus } from './modules/eventbus';

import { HeaderController } from './controllers/HeaderController';
import { IndexController } from './controllers/IndexController';
import { ACTIONS, AUTH, PROFILE, RESPOND, RESUME, VACANCY, COMPANY } from './modules/events';

import authModel from './models/AuthModel';
import vacancyModel from './models/VacancyModel';
import resumeModel from './models/ResumeModel';
import profileModel from './models/ProfileModel';
import respondModel from './models/RespondModel';
import companyModel from './models/CompanyModel';

import { SigninController } from './controllers/SigninController';
import { SignupSeekerController } from './controllers/SignupSeekerController';
import { SignupEmployerController } from './controllers/SignupEmployerController';
import { CreateVacancyController } from './controllers/CreateVacancyController';
import { CreateResumeController } from './controllers/CreateResumeController';
import { ProfileController } from './controllers/ProfileController';
import { VacancyPageController } from './controllers/VacancyPageController';
import { ResumePageController } from './controllers/ResumePageController';
import { SearchController } from './controllers/SearchController';
import { FoundVacanciesController } from './controllers/FoundVacanciesController';
import { FoundResumesController } from './controllers/FoundResumesController';
import { FavoriteVacanciesController } from './controllers/FavoriteVacanciesController';
import { ChooseResumeController } from './controllers/ChooseResumeController';
import { MyRespondsController } from './controllers/MyRespondsController';
import { EmployerPageController } from './controllers/EmployerPageController';
import { OfflinePageController } from './controllers/OfflinePageController';

function renderHTML () {
  const body = document.querySelector('body');
  body.classList.add('page');

  body.innerHTML = `
      <header class="header"></header>
      <div class="main-content">
          <div class="left-column"></div>
          <div class="right-column"></div>
      </div>
  
<!--      <div class="chatbubble">-->
<!--          <div class="unexpanded">-->
<!--              <div class="title">Чат с поддержкой</div>-->
<!--              <iframe class="iframe-chat" src="/chat"></iframe>-->
<!--          </div>-->
<!--      </div>-->
<!--      <script src="./js/modules/popupChat.js"></script>-->
   `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderHTML();

  // Проверим, что эта технология доступна в браузере
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then((reg) => {
        // регистрация сработала
        console.log('Registration succeeded. Scope is ' + reg.scope);
      }).catch((error) => {
      // регистрация прошла неудачно
      console.log('Registration failed with ' + error);
    });
  }

  const body = document.querySelector('body');
  const header = document.querySelector('header');
  const content = document.querySelector('.main-content');

  const globalEventBus = new EventBus([AUTH, VACANCY, RESUME, PROFILE, RESPOND, ACTIONS, COMPANY].map(model => Object.values(model)).flat());
  const models = {
    auth: authModel,
    vacancy: vacancyModel,
    resume: resumeModel,
    profile: profileModel,
    respond: respondModel,
    company: companyModel,
  };
  Object.values(models).forEach(model => model.setGlobalEventBus(globalEventBus));

  const router = new Router(body);

  const headerController = new HeaderController(header, globalEventBus, router);
  const indexController = new IndexController(content, globalEventBus, router);
  const signinController = new SigninController(content, globalEventBus, router);
  const signupSeekerController = new SignupSeekerController(content, globalEventBus, router);
  const signupEmployerController = new SignupEmployerController(content, globalEventBus, router);
  const createVacancyController = new CreateVacancyController(content, globalEventBus, router);
  const createResumeController = new CreateResumeController(content, globalEventBus, router);
  const profileController = new ProfileController(content, globalEventBus, router);
  const vacancyPageController = new VacancyPageController(content, globalEventBus, router);
  const resumePageController = new ResumePageController(content, globalEventBus, router);
  const searchController = new SearchController(content, globalEventBus, router);
  const foundVacanciesController = new FoundVacanciesController(content, globalEventBus, router);
  const foundResumesController = new FoundResumesController(content, globalEventBus, router);
  const favoriteVacanciesController = new FavoriteVacanciesController(content, globalEventBus, router);
  const chooseResumeController = new ChooseResumeController(content, globalEventBus, router);
  const myRespondsController = new MyRespondsController(content, globalEventBus, router);
  const employerPageController = new EmployerPageController(content, globalEventBus, router);
  const offlinePageController = new OfflinePageController(content, globalEventBus, router);

  headerController.openWithData();

  router.add('/', indexController);
  router.add('/signin', signinController);
  router.add('/signupseeker', signupSeekerController);
  router.add('/signupemployer', signupEmployerController);
  router.add('/createvacancy', createVacancyController);
  router.add('/createresume', createResumeController);
  router.add('/profile', profileController);
  router.add('/employer', employerPageController);
  router.add('/vacancy', vacancyPageController);
  router.add('/resume', resumePageController);
  router.add('/chooseResume', chooseResumeController);
  router.add('/my_responds', myRespondsController);

  router.add('/search/vacancy', searchController);
  router.add('/search/company', searchController);
  router.add('/search/resume', searchController);

  router.add('/vacancies', foundVacanciesController);
  router.add('/resumes', foundResumesController);
  router.add('/favorite_vacancies', favoriteVacanciesController);
  router.add('/offline', offlinePageController);

  router.start();
});
