import { IndexView } from '../views/Index/IndexView';
import { IndexModel } from '../models/IndexModel';

export class IndexController {
  constructor(root){
    this.indexView=new IndexView(root);
    this.indexModel=new IndexModel(root);
  }

}
