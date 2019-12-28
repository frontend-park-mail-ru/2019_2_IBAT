import { View } from '../../modules/view';

export class PresentationView extends View {
  constructor (root) {
    super(root);
  }

  render () {
    document.body.innerHTML=`<iframe 
            src="https://docs.google.com/presentation/d/e/2PACX-1vT6dGDJnirL-LT3gjFQD0vW-7-uRjg6YWCwdbc9JisDv9k4Gk1jG-NQBxxQ58_3COA8A7QxME5chG2l/embed?start=false&loop=false&delayms=60000" 
            frameborder="0" 
            width="960" 
            height="569"
            allowfullscreen="true" 
            mozallowfullscreen="true"
            webkitallowfullscreen="true">
           
            </iframe>`;
  }
}
