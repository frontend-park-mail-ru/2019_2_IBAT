import template from './shortResume.pug';

export class ShortResumeComponent {
  constructor (resume = {}, isChooseMode = false, clickEventListener) {
    this._resume = resume;

    this._resumeCard = document.createElement('div');
    this._resumeCard.classList.add('card');
    this._resumeCard.innerHTML = template({ ...this._resume, isChooseMode });

    this._resumeCard.addEventListener('click', ev => {
      clickEventListener(this._resume);
    });
  }

  appendToList (list) {
    list.appendChild(this._resumeCard);
  }
}
