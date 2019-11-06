import { EventBus } from '../modules/eventbus';
import { SearchVacancyView } from '../views/SearchVacancy/SearchVacancyView';
import { SearchVacancyModel } from '../models/SearchVacancyModel';

const eventList = [

];
  
export class SearchVacancyController {
    constructor (root, globalEventBus, router) {
        const eventBus = new EventBus(eventList);
        // eventBus.subscribeToEvent('createSuccess', (_)=>{
        //     router.toStartPage();
        // });
        this.searchVacancyView = new SearchVacancyView(root, eventBus, globalEventBus);
        this.searchVacancyModel = new SearchVacancyModel(eventBus);
    }
}