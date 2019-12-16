import { SearchView } from '../views/Search/SearchView';
import { Controller } from '../modules/controller';
import { SEARCH } from '../modules/events';

export class SearchController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._globalEventBus.subscribeToEvent(SEARCH.search, (url) => {
      console.log('searchcontroller', url);
      this._router.redirect({path: url});
    });

    this._view = new SearchView(this._root, this._globalEventBus);
  }

  openWithData(data = {}) {
    // Достаем из урла состояние поиска
    data['mode'] = this._router.currentRoute.split('/')[2];
    this._view.render(data);
  }
}
