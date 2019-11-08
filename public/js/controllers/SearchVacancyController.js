import { EventBus } from '../modules/eventbus';
import { SearchVacancyView } from '../views/SearchVacancy/SearchVacancyView';
import { SearchVacancyModel } from '../models/SearchVacancyModel';

const eventList = [
    'find',
    'searchSuccess',
    'searchFailed',
];
  
export class SearchVacancyController {
    constructor (root, globalEventBus, router) {
        const eventBus = new EventBus(eventList);
        eventBus.subscribeToEvent('searchSuccess', (url, vacancies) => {
            console.log('searchcontroller', url, vacancies);
            router.redirect(url, vacancies);
        });
        this.searchVacancyView = new SearchVacancyView(root, eventBus);
        this.searchVacancyModel = new SearchVacancyModel(eventBus);
    }
}