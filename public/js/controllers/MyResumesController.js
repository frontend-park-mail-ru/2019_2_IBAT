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
      if (response.ok) {
        response.json()
        .then(resumes => {
          this._view.render(resumes );
        })
      } else {
        this._view.render();
      }
    })
      .catch(error => {
        console.log(error);
      })
  }
}
