import Net from './net.js';

export default class Api {
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

}


