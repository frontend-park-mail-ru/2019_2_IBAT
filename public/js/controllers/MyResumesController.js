import { Controller } from '../modules/controller';
import { MyResumesView } from '../views/MyResumes/MyResumesView';
import { Api } from '../modules/api';

export class MyResumesController extends Controller {
  constructor (root, globalEventBus, router) {
    super(root, globalEventBus, router);

    this._view = new MyResumesView(this._root, this._globalEventBus);
  }

  openWithData() {
    Api.getOwnResumes()
    .then(response => {
      return response.ok ? response.json() : null;
    })
    .then(resumes => {
      console.log(resumes);
      this._view.render(resumes);
    })
    .catch(error => {
      console.log(error);
    })
  }
}
