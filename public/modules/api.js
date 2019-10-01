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
     * Авторизует пользователя
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
    static signOut(){
        return Net.doDelete({url: '/auth'});
    }

    /**
     * Регистрирует соискателя
     * @returns {Promise<Response>}
     * @param user
     */
    static signUpSeeker (user={}) {
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
     * Запрос данных для профиля соискателя
     * @param email
     * @param firstName
     * @param secondName
     * @param password
     * @returns {Promise<Response>}
     */
    static getSeekerProfile () {
        return Net.doGet({ url: '/seeker' });
    }

    /**
     * Загружает на сервер аватар
     * @param avatar
     * @returns {Promise<Response>}
     */
    static uploadAvatar ({ avatar } = {}) {
        let formData = new FormData();
        formData.append('avatar', avatar);
        return Net.doPostFormData({
            url: '/upload',
            body: formData
        });
    }

     /**
     * Создание резюме
     * @param ResumeData
     * @returns {Promise<Response>}
     */
    // Надо сделать модель Resume(пока что просто поля через запятую)
    static createResume ({ FirstName, SecondName, City, PhoneNumber, BirthDate,  Sex, Citizenship, Experience, Profession, Position, Wage, Education, About} = {}) {
        return Net.doPost({
            url: '/resume',
            body : {
                "first_name": FirstName,
                "second_name": SecondName,
                "city": City,
                "phone_number": PhoneNumber,
                "birth_date": BirthDate,
                "sex": Sex,
                "citizenship":  Citizenship,
                "experience": Experience,
                "profession": Profession,
                "position": Position,
                "wage":   Wage,
                "education":  Education,
                "about":  About,
            }         
        });
    }

    /**
     * Создание вакансии
     * @param Vacancy
     * @returns {Promise<Response>}
     */
    // Надо сделать модель Resume(пока что просто поля через запятую)
    static createVacancy(vacancy = {}) {
        return Net.doPost({
            url: '/vacancy',
            body : vacancy
        });
    }

    /**
     * Запрос списка резюме
     * @param ...
     * @returns {Promise<Response>}
     */
    static getResumes() {
        return Net.doGet({
            url: '/resumes',
        });
    }

    /**
     * Запрос списка вакансий
     * @param ...
     * @returns {Promise<Response>}
     */
    static getVacancies() {
        return Net.doGet({
            url: '/vacancies',
        });
    }

    /**
     * Запрос данных резюме
     * @param Id
     * @returns {Promise<Response>}
     */
    static getResumeById( id = {}) {
        return Net.doGet({
            url: '/resume' + '/' + id
        });
    }

    /**
     * Запрос данных вакансии
     * @param Id
     * @returns {Promise<Response>}
     */
    static getVacancyById( id = {}) {
        return Net.doGet({
            url: '/vacancy' + '/' + id
        });
    }

}