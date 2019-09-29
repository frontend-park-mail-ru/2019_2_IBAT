import Router from './utils/router';
import {MainPage} from './pages/main/main'
import {SignupSeeker} from "./pages/SignupSeeker/SignupSeeker";

document.addEventListener('DOMContentLoaded', () => {
    const application = document.getElementsByTagName('body')[0];
    const router = new Router(application);
    router.add('/', new MainPage());
    router.add('/signupseeker', new SignupSeeker());
    router.add('/vacancies', new);
    router.start();
});
