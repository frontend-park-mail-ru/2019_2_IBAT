import { SearchVacancyModel } from '../models/SearchVacancyModel';
import { SearchVacancyView } from '../views/SearchVacancy/SearchVacancyView';
import { Controller } from '../modules/controller';
import { EventBus } from '../modules/eventbus';

const eventList = [
    'find',
    'searchSuccess',
    'searchFailed',
];
  
export class SearchVacancyController extends Controller{
    constructor (root, globalEventBus, router) {
        super(root, null, router);

        const eventBus = new EventBus(eventList);
        eventBus.subscribeToEvent('searchSuccess', (url, vacancies) => {
            console.log('searchcontroller', url, vacancies);
            this._router.redirect(url, vacancies);
        });

        this._view= new SearchVacancyView(this._root, eventBus);
        this._model = new SearchVacancyModel(eventBus);
    }
}