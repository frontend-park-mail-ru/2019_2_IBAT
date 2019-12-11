export const hostIP = 'tko.vladimir.fvds.ru';

export const serverURL = `https://${hostIP}/api`;
export const serverNotificationURL = `ws://${hostIP}/api/notifications`;
export const serverImgURL = `https://${hostIP}/img`;
// export const serverURL = '/api';
export const serverChatURL = `ws://${hostIP}:8090/chat`;

export default class Net {
  /**
   * Get запрос
   * @param url
   * @returns {Promise<Response>}
   */
  static doGet ({ url = '/' } = {}) {
    return fetch(Net.getServerURL() + url, {
      method: 'GET',
      mode: 'cors',
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
    let token = localStorage.getItem('token');
    return fetch(host + url, {
      method: 'POST',
      body: JSON.stringify(body),
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-CSRF-Token': token
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
    let token = localStorage.getItem('token');
    return fetch(Net.getServerURL() + url, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'X-CSRF-Token': token
      }
    });
  }

  /**
   * Put запрос, с JSON body
   * @param url
   * @param body
   * @returns {Promise<Response>}
   */
  static doPut ({ url = '/', body = {} } = {}) {
    let token = localStorage.getItem('token');
    return fetch(Net.getServerURL() + url, {
      method: 'PUT',
      body: JSON.stringify(body),
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-CSRF-Token': token
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
   * Возвращает url api server-a для получения img
   * @returns {string}
   */
  static getServerImgURL () {
    return serverImgURL;
  }

  /**
   * Post запрос с multipart form data. Fetch сам выставляет необходимые заголовки
   * @param url
   * @param body
   * @returns {Promise<Response>}
   */
  static doPostFormData ({ url = '/', body = {} } = {}) {
    let token = localStorage.getItem('token');
    return fetch(Net.getServerURL() + url, {
      method: 'POST',
      body,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'X-CSRF-Token': token
      }
    });
  }
}
