import Router from './modules/router';
import {MainPage} from './pages/main/main'
import {SignupSeeker} from "./pages/SignupSeeker/SignupSeeker";
import {CreateVacancy} from "./pages/CreateVacancy/CreateVacancy";

document.addEventListener('DOMContentLoaded', () => {
    const application = document.getElementsByTagName('body')[0];
    const router = new Router(application);
    router.add('/', new MainPage());
    router.add('/signupseeker', new SignupSeeker());
    // router.add('/vacancies', new);
    router.add('/vacancy', new CreateVacancy());
    router.start();
});
