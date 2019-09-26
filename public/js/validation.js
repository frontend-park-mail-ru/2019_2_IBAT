const errEmailIsEmpty = 'Email is empty';
const errPassIsEmpty = 'Pass is empty';
const errEmailIsInvalid = 'Email is invalid';
const errInvalidPasswordData = 'Must contain at least 8 chars';
const errNotEqualPassRePass = 'Password and Password Repeat are not equal';

const emailRegexExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const passRegexExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/;

export default class Validation {
    /**
     * Валидирует email.
     * @param email
     * @param withRegex - flag (если true - то проверяется Regex на валидность)
     * @returns {string} если не валидный емаил, возвращает false.
     */
    static validateEmail (email, withRegex = false) {
        if (!email) {
            return errEmailIsEmpty;
        }

        if (withRegex && !Validation.validateEmailRegex(email)) {
            return errEmailIsInvalid;
        }

        return true;
    }
    /**
     * Валидирует пароль.
     * @param password
     * @param withRegex - flag (если true - то пароль проверяется Regex на валидность)
     * @returns {string} если не валидный пароль, возвращает ошибку.
     */
    static validatePassword (password, withRegex = false) {
        if (!password) {
            return errPassIsEmpty;
        }
        if (withRegex && !Validation.validatePassRegex(password)) {
            return errInvalidPasswordData;
        }
    }
    /**
     * Сравнивает 2 пароля.
     * @param repass
     * @param pass
     * @returns {string}
     */
    static validateRepass (repass, pass) {
        const errRepass = Validation.validatePassword(repass);
        if (errRepass) {
            return errRepass;
        } 
        if (pass !== repass) {
            return errNotEqualPassRePass;
        }
    }

    /**
     * RFC 2822.
     * @param email
     * @returns {boolean}
     */
    static validateEmailRegex (email) {
        return emailRegexExp.test(String(email).toLowerCase());
    }

    /**
     * Проверяет на условие: 8 символов, 1 цифра, 1 в верхнем и 1 в нижнем регистре.
     * @param pass
     * @returns {boolean}
     */
    static validatePassRegex (pass) {
        return passRegexExp.test(String(pass));
    }
    /**
     * Проверяет на пустоту.
     * @param value
     * @returns {boolean}
     */
    static isEmptyField(value) {
        return value == "";
    }
}
