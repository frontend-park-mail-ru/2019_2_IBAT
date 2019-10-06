import Router from './modules/router';
import { EventBus } from './modules/eventbus';

import { IndexController } from './controllers/IndexController';
import { HeaderController } from './controllers/HeaderController';
import { SigninController } from './controllers/SigninController';
import { SignupSeekerController } from './controllers/SignupSeekerController';
import { SignupEmployerController } from './controllers/SignupEmployerController';
// import {SignupSeeker} from "./pages/SignupSeeker/SignupSeeker";
// import {CreateVacancy} from "./pages/CreateVacancy/CreateVacancy";
// import {SignupEmployer} from "./pages/SignupEmployer/SignupEmployer";
// import {SignIn} from "./pages/Signin/Signin";

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('.page');
  const header = document.querySelector('header');
  const content = document.querySelector('.main-content');

  const router = new Router(body);

  const globalEventBus = new EventBus([
    'headerLoad'
  ]);

  const headerController = new HeaderController(header, globalEventBus);
  const indexController = new IndexController(content);
  const signinController = new SigninController(content, globalEventBus, router);
  const signupSeekerController = new SignupSeekerController(content, globalEventBus, router);
  const signupEmployerController = new SignupEmployerController(content, globalEventBus, router);

  headerController.headerView.render();

  router.add('/', indexController.indexView);
  router.add('/signin', signinController.signInView);
  router.add('/signupseeker', signupSeekerController.signupSeekerView);
  router.add('/signupemployer', signupEmployerController.signupEmployerView);

  // router.add('/signupseeker', new SignupSeeker(router));
  // router.add('/signupemployer', new SignupEmployer(router));
  // router.add('/create_vacancy', new CreateVacancy());
  // window.router = router;
  router.start();
});
