import Router from './modules/router';
import {MainPage} from './pages/main/main'
import {SignupSeeker} from "./pages/SignupSeeker/SignupSeeker";
import {CreateVacancy} from "./pages/CreateVacancy/CreateVacancy";
import {SignupEmployer} from "./pages/SignupEmployer/SignupEmployer";
import {SignIn} from "./pages/Signin/Signin";

document.addEventListener('DOMContentLoaded', () => {
    const application = document.getElementsByTagName('body')[0];
    const router = new Router(application);
    router.add('/', new MainPage(router));
    router.add('/signupseeker', new SignupSeeker(router));
    router.add('/signupemployer', new SignupEmployer(router));
    router.add('/signin', new SignIn(router));
    router.add('/vacancy', new CreateVacancy());
    router.start();
});
