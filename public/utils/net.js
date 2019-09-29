const serverURL = 'http://82.146.43.113:8080';


export default class Net {
    /**
     * Get запрос
     * @param url
     * @returns {Promise<Response>}
     */
    static doGet ({ url = '/' } = {}) {
        return fetch(Net.getServerURL() + url, {
            method: 'GET',
            credentials: 'include'
        });
    }

    /**
     * Post запрос, с JSON body
     * @param url
     * @param body
     * @param host
     * @returns {Promise<Response>}
     */
    static doPost ({ url = '/', body = {}, host = Net.getServerURL() } = {}) {
        return fetch(host + url, {
            method: 'POST',
            body: JSON.stringify(body),
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }

    /**
     * Delete запрос
     * @param url
     * @param body
     * @returns {Promise<Response>}
     */
    static doDelete ({ url = '/', body = {} } = {}) {
        return fetch(Net.getServerURL() + url, {
            method: 'DELETE',
            credentials: 'include'
        });
    }

    /**
     * Put запрос, с JSON body
     * @param url
     * @param body
     * @returns {Promise<Response>}
     */
    static doPut ({ url = '/', body = {} } = {}) {
        return fetch(Net.getServerURL() + url, {
            method: 'PUT',
            body: JSON.stringify(body),
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }

    /**
     * Возвращает url api server-a
     * @returns {string}
     */
    static getServerURL () {
        return serverURL;
    }

    /**
     * Post запрос с multipart form data. Fetch сам выставляет необходимые заголовки
     * @param url
     * @param body
     * @returns {Promise<Response>}
     */
    static doPostFormData ({ url = '/', body = {} } = {}) {
        return fetch(Net.getServerURL() + url, {
            method: 'POST',
            body,
            mode: 'cors',
            credentials: 'include'
        });
    }
}