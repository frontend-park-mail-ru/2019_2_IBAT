import { FoundResumesView } from '../views/FoundResumes/FoundResumesView';
import { Controller } from '../modules/controller';
import { ACTIONS, RESUME } from '../modules/events';

export class FoundResumesController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);
    this._resumes = [];
    this._request = '';
    this._view = new FoundResumesView(this._root, this._globalEventBus);

    this._globalEventBus.subscribeToEvent(ACTIONS.changeRequest, _=>{
      this._router.back();
    });

    this._globalEventBus.subscribeToEvent(RESUME.searchSuccess, resumes => {
      this._resumes = resumes;
      this._view.render(this._resumes);
    })

    this._globalEventBus.subscribeToEvent(RESUME.searchFailed, _ => {
      this._view.render();
    })
  }

  openWithData () {
    // если запрос совпал(значит мы вернулись назад), то отдаём старые resumes, иначе ищем новые
    if (this._request == this._router.currentRoute) {
      this._view.render(this._resumes);
    } else {
      this._request = this._router.currentRoute;
      this._globalEventBus.triggerEvent(RESUME.search, this._request);
    }
  }
}