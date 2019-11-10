import Net from './net.js';

export class Api {
  /**
   * Проверяет сессию
   * @returns {Promise}
   */
  static checkSession () {
    return Net.doGet({ url: '/auth' });
  }

  /**
   * Авторизует  static getVacancies () {
    return Net.doGet({
      url: '/vacancies',
    });
  }пользователя
   * @returns {Promise<Response>}
   * @param user
   */
  static signIn (user = {}) {
    return Net.doPost({
      url: '/auth',
      body: user
    });
  }

  /**
   * Выходит из профиля
   * @returns {Promise}
   */
  static signOut () {
    return Net.doDelete({ url: '/auth' });
  }

  /**
   * Регистрирует соискателя
   * @returns {Promise<Response>}
   * @param user
   */
  static signUpSeeker (user = {}) {
    return Net.doPost({
      url: '/seeker',
      body: user
    });
  }

  /**
   * Регистрирует соискателя
   * @returns {Promise<Response>}
   * @param user
   */
  static signUpEmployer (user = {}) {
    return Net.doPost({
      url: '/employer',
      body: user
    });
  }

  /**
   * Запрос данных профиля
   * @returns {Promise<Response>}
   */
  static getProfile () {
    return Net.doGet({ url: '/profile' });
  }

  /**
   * Изменение данных соискателя
   * @return {Promise<Response>}
   */
  static updateSeeker (user) {
    return Net.doPut({
      url: '/seeker',
      body: user
    });
  }

  /**
   * Изменение данных соискателя
   * @return {Promise<Response>}
   */
  static updateEmployer (user) {
    return Net.doPut({
      url: '/employer',
      body: user
    });
  }

  /**
   * Загружает на сервер аватар
   * @param avatar
   * @returns {Promise<Response>}
   */
  static uploadAvatar ({ avatar } = {}) {
    let formData = new FormData();
    formData.append('my_file', avatar);
    return Net.doPostFormData({
      url: '/upload',
      body: formData
    });
  }

  /**
   * Создание резюме
   * @returns {Promise<Response>}
   * @param resume
   */
  // Надо сделать модель Resume(пока что просто поля через запятую)
  static createResume (resume = {}) {
    return Net.doPost({
      url: '/resume',
      body: resume
    });
  }

  /**
   * Создание вакансии
   * @returns {Promise<Response>}
   * @param vacancy
   */
  // Надо сделать модель Resume(пока что просто поля через запятую)
  static createVacancy (vacancy = {}) {
    return Net.doPost({
      url: '/vacancy',
      body: vacancy
    });
  }

  /**
   * Запрос списка резюме
   * returns {Promise<Response>}
   */
  static getResumes () {
    return Net.doGet({
      url: '/resumes',
    });
  }

  /**
   * Запрос списка вакансий
   * @returns {Promise<Response>}
   */
  static getVacancies () {
    return Net.doGet({
      url: '/vacancies',
    });
  }

  /**
   * Запрос на поиск вакансий
   * @param {String} getParameters
   * @returns {Promise<Response>}
   */
  static searchVacancies(getParameters) {
    console.log(getParameters);
    return Net.doGet({ url: '/vacancies' + getParameters });
  }

  /**
   * Запрос данных резюме
   * @returns {Promise<Response>}
   * @param id
   */
  static getResumeById (id = {}) {
    return Net.doGet({
      url: '/resume' + '/' + id
    });
  }

  /**
   * Запрос данных вакансии
   * @returns {Promise<Response>}
   * @param id
   */
  static getVacancyById (id = {}) {
    return Net.doGet({
      url: '/vacancy' + '/' + id
    });
  }

  /**
   * Запрос работадателя по его id
   * @param id
   * @returns {Promise<Response>}
   */
  static getEmployerById(id={}){
    return Net.doGet({
      url: '/employer' + '/' + id
    });
  }

  /**
   * Запрос на избранные вакансии
   * @returns {Promise<Response>}
   */
  static getFavoriteVacancies( ){
    return Net.doGet({
      url: '/favorite_vacancies'
    });
  }
}
