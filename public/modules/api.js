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
     * @param email
     * @param password
     * @returns {Promise<Response>}
     */
    static signIn ({ email, password } = {}) {
        return Net.doPost({
            url: '/auth',
            body: {
                'login': email,
                'password': password,
            }
        });
    }

    /**
     * Регистрирует соискателя
     * @param email
     * @param firstName
     * @param secondName
     * @param password
     * @returns {Promise<Response>}
     */
    static signUpSeeker ({ email, firstName, secondName, password } = {}) {
        return Net.doPost({
            url: '/seeker',
            body: {
                "email" : email,
                "first_name" : firstName,
                "second_name" : secondName,
                "password" :    password,
            }
        });
    }

    /**
     * Регистрирует соискателя
     * @param ...
     * @returns {Promise<Response>}
     */
    static signUpEmployer ({ CompanyName, Site, FirstName, SecondName, Email,  phoneNumber, ExtraNumber,  Password, City, EmplNum } = {}) {
        return Net.doPost({
            url: '/employer',
            body: {
                "company_name": CompanyName,
                "site": Site,
                "first_name": FirstName,
                "second_name": SecondName,
                "email": Email,
                "phone_number": phoneNumber,
                "extra_number": ExtraNumber,
                "password": Password,
                "city": City,
                "empl_num": EmplNum,
            }
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