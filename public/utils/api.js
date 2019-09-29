import Net from './net.js';

export class Api {
    /**
     * Проверяет сессию
     * @returns {Promise}
     */
    static checkSession () {
        return Net.doGet({ url: '/auth' });
    }
}
