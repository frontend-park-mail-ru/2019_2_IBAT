import { Router } from './modules/router';
import { EventBus } from './modules/eventbus';

import { HeaderController } from './controllers/HeaderController';
import { IndexController } from './controllers/IndexController';
import { AUTH, RESUME, VACANCY, PROFILE } from './modules/events';

import authModel from './models/AuthModel';
import vacancyModel from './models/VacancyModel';
import resumeModel from './models/ResumeModel';
import profileModel from './models/ProfileModel';

import { SigninController } from './controllers/SigninController';
import { SignupSeekerController } from './controllers/SignupSeekerController';
import { SignupEmployerController } from './controllers/SignupEmployerController';
import { CreateVacancyController } from './controllers/CreateVacancyController';
import { CreateResumeController } from './controllers/CreateResumeController';
import { ProfileController } from './controllers/ProfileController';
import { VacancyPageController } from './controllers/VacancyPageController';
import { ResumePageController } from './controllers/ResumePageController';
import { SearchVacancyController } from './controllers/SearchVacancyController';
import { FoundVacanciesController } from './controllers/FoundVacanciesController';
import { FavoriteVacanciesController } from './controllers/FavoriteVacanciesController';

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('.page');
  const header = document.querySelector('header');
  const content = document.querySelector('.main-content');

  const globalEventBus = new EventBus([AUTH, VACANCY, RESUME, PROFILE].map(model => Object.values(model)).flat());
  const models = {
    auth: authModel,
    vacancy: vacancyModel,
    resume: resumeModel,
    profile: profileModel
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
  const vacancyPageController = new VacancyPageController(content,globalEventBus, router);
  const resumePageController = new ResumePageController(content, globalEventBus, router);
  const searchVacancyController = new SearchVacancyController(content, globalEventBus, router);
  const foundVacanciesController = new FoundVacanciesController(content, globalEventBus, router);
  const favoriteVacanciesController = new FavoriteVacanciesController(content, globalEventBus, router);

  headerController.openWithData();

  router.add('/', indexController);
  router.add('/signin', signinController);
  router.add('/signupseeker', signupSeekerController);
  router.add('/signupemployer', signupEmployerController);
  router.add('/createvacancy', createVacancyController);
  router.add('/createresume', createResumeController);
  router.add('/profile', profileController);
  router.add('/vacancy', vacancyPageController);
  router.add('/resume', resumePageController);

  router.add('/search/vacancy', searchVacancyController);
  router.add('/vacancies', foundVacanciesController);
  router.add('/favorite_vacancies', favoriteVacanciesController);

  router.start();
});
