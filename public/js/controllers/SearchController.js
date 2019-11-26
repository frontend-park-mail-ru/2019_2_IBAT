import { SearchView } from '../views/Search/SearchView';
import { Controller } from '../modules/controller';
import { VACANCY, RESUME } from '../modules/events';

export class SearchController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._globalEventBus.subscribeToEvent(VACANCY.searchSuccess, (url, vacancies = [], parameters) => {
      console.log('searchcontroller', url, vacancies);
      this._router.redirect({path: url, data: vacancies, prevState: parameters});
    });

    this._globalEventBus.subscribeToEvent(RESUME.searchSuccess, (url, resumes = [], parameters) => {
      console.log('searchcontroller', url, resumes);
      this._router.redirect({path: url, data: resumes, prevState: parameters});
    });

    this._view = new SearchView(this._root, this._globalEventBus);
  }

  openWithData(data = {}) {
    data['mode'] = this._router.currentRoute.split('/')[2];
    this._view.render(data);
  }
}
