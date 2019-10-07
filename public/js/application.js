import Router from './modules/router';
import { EventBus } from './modules/eventbus';

import { IndexController } from './controllers/IndexController';
import { HeaderController } from './controllers/HeaderController';
import { SigninController } from './controllers/SigninController';
import { SignupSeekerController } from './controllers/SignupSeekerController';
import { SignupEmployerController } from './controllers/SignupEmployerController';
import { CreateVacancyController } from './controllers/CreateVacancyController';
import { CreateResumeController } from './controllers/CreateResumeController';
import { ProfileController } from './controllers/ProfileController';
import { VacancyPageController } from './controllers/VacancyPageController';
// import {SignupSeeker} from "./pages/SignupSeeker/SignupSeeker";
// import {SignupEmployer} from "./pages/SignupEmployer/SignupEmployer";
// import {SignIn} from "./pages/Signin/Signin";

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('.page');
  const header = document.querySelector('header');
  const content = document.querySelector('.main-content');

  const router = new Router(body);

  const globalEventBus = new EventBus([
    'headerLoad',
    'getRoleFromHeader'
  ]);

  const headerController = new HeaderController(header, globalEventBus, router);
  const indexController = new IndexController(content, globalEventBus);
  const signinController = new SigninController(content, globalEventBus, router);
  const signupSeekerController = new SignupSeekerController(content, globalEventBus, router);
  const signupEmployerController = new SignupEmployerController(content, globalEventBus, router);
  const createVacancyController = new CreateVacancyController(content, globalEventBus, router);
  const createResumeController = new CreateResumeController(content, globalEventBus, router);
  const profileController = new ProfileController(content, router);
  const vacancyPageController = new VacancyPageController(content, router);

  headerController.headerView.render();

  router.add('/', indexController.indexView);
  router.add('/signin', signinController.signInView);
  router.add('/signupseeker', signupSeekerController.signupSeekerView);
  router.add('/signupemployer', signupEmployerController.signupEmployerView);
  router.add('/createvacancy', createVacancyController.createVacancyView);
  router.add('/createresume', createResumeController.createResumeView);
  router.add('/profile', profileController.profileView);
  router.add('/vacancy', vacancyPageController.vacancyPageView);

  router.start();
});
