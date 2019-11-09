import { FavoriteVacanciesModel } from '../models/FavoriteVacanciesModel';
import { FavoriteVacanciesView } from '../views/FavoriteVacancies/FavoriteVacanciesView';
import { Controller } from '../modules/controller';
import { EventBus } from '../modules/eventbus';

const eventList = [
    'loadFavorite',
    'loadSuccess'
];

export class FavoriteVacanciesController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._eventBus = new EventBus(eventList);

    this._view = new FavoriteVacanciesView(this._root, this._eventBus, this._globalEventBus);
    this._model = new FavoriteVacanciesModel(this._eventBus);

    this._eventBus .subscribeToEvent('loadSuccess', (vacancies = []) => {
        console.log(vacancies);
        this._view.hide();
        this._view.render(vacancies);
    });
  }

  openWithData(data = []) {
    this._eventBus.triggerEvent('loadFavorite');
  }
}
