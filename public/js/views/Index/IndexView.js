import template from './index.pug';
import { View } from '../../modules/view';
import { ACTIONS, AUTH } from '../../modules/events';
import { SearchBarComponent } from '../../../components/SearchBarComponent/SearchBarComponent';
import { MyEventsComponent } from '../../../components/MyEventsComponent/MyEventsComponent';
import { CompaniesListComponent } from '../../../components/CompaniesListComponent/CompaniesListComponent';
import { PopularComponent } from '../../../components/PopularComponent/PopularComponent';

export class IndexView extends View {
  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);

    this.data = {};

    this._globalEventBus.subscribeToEvent(AUTH.checkAuthResponse, this._onAuthResponse.bind(this));
  }

  render (data = {}) {
    this.isViewClosed = false;

    this.merge(data);

    this._globalEventBus.triggerEvent(AUTH.checkAuth);
  }

  /**
   * Получает данные авторизации(роль юзера) и запрашивает нужные данные в зависимости от роли
   * @param data
   * @private
   */
  _onAuthResponse (data) {
    if (this.isViewClosed) {
      return;
    }
    // //TODO костыль, чтобы этот checkAuth не затирал своим undefined для гостя его статус после клика (guestSeeker, guestEmployer)
    console.log(`HeaderView: _onAuthResponse() --- ${this.getRole}`);
    super.render(this.data);
  }

  get searchBanner () {
    return this._root.querySelector('.js-search-banner');
  }

  get personalBlockLeft () {
    return this._root.querySelector('.js-personal-block-left');
  }

  get personalBlockRight () {
    return this._root.querySelector('.js-personal-block-right');
  }

  get sliderSeeker () {
    return this._root.querySelector('.js-slider-seeker');
  }

  get sliderEmployer () {
    return this._root.querySelector('.js-slider-employer');
  }

  onRender () {
    if (this.sliderSeeker) {
      this.sliderSeeker.addEventListener('click', _ => {
        localStorage.setItem('role','seekerGuest');
        this._globalEventBus.triggerEvent(ACTIONS.seekerGuestSlide, this.data);
      });
    }
    if (this.sliderEmployer) {
      this.sliderEmployer.addEventListener('click', _ => {
        localStorage.setItem('role','employerGuest');
        this._globalEventBus.triggerEvent(ACTIONS.employerGuestSlide, this.data);
      });
    }

    if (this.getRole) {
      this.showSearchBar();
      this.showPersonalBlock();
    }
    console.log(this.getRole);
  }

  showPersonalBlock () {
    console.log('showPersonalBlock()' + this.getRole);
    if (this.getRole === 'seeker' || this.getRole === 'employer') {
      const myEventsComponent = new MyEventsComponent(this.data);
      myEventsComponent.renderTo(this.personalBlockLeft);
    }
    if (this.getRole === 'seekerGuest') {
      const companiesListComponent = new CompaniesListComponent(this.data, this._globalEventBus);
      companiesListComponent.renderTo(this.personalBlockLeft);
    }
    if (this.getRole === 'employerGuest') {
      //показываем PaidServicesComponent
    }

    //пока что показываем что не авторизованным, что авторизованным популярные вакансии/резюме, потом будем показывать реккомендуемые для last
    const popularComponent = new PopularComponent(this.data, this._globalEventBus);
    popularComponent.renderTo(this.personalBlockRight);
  }

  showSearchBar () {
    const searchBar = new SearchBarComponent(this.data, this._globalEventBus);
    searchBar.renderTo(this.searchBanner);
  }

  // /**
  //  * Получает вакансии от модели и отображает списком
  //  * @param vacancies
  //  * @private
  //  */
  // _onGetVacanciesSuccess (vacancies) {
  //   const list = document.createElement('div');
  //   list.className = 'list';
  //
  //   this._root.appendChild(list);
  //
  //   console.log('INDEX:onGetVacanciesSuccess', vacancies);
  //   if (vacancies) {
  //     vacancies.forEach(vacancy => {
  //       new ShortVacancyComponent(vacancy).appendToList(list);
  //     });
  //   }
  // }
  //
  // /**
  //  * Получает резюме от модели и отображает списком
  //  * @param resumes
  //  * @private
  //  */
  // _onGetResumesSuccess (resumes) {
  //   const left_column = document.createElement('div');
  //   left_column.classList.add('left-column');
  //   const list = document.createElement('div');
  //   list.className = 'list';
  //
  //   left_column.appendChild(list);
  //   this._root.appendChild(left_column);
  //
  //   console.log('INDEX:onGetResumesSuccess', resumes);
  //   if (resumes) {
  //     resumes.forEach(resume => {
  //       new ShortResumeComponent(resume).appendToList(list);
  //     });
  //   }
  // }
}
