import { Api } from '../modules/api';

class TagsModel {

    constructor() {
        // 1 раз просим тэги у бэка и всё
        this._downloadTags();
    }

    getTags() {
        return this._tags ? this._tags : JSON.parse(localStorage.getItem('tags'));
    }

    _downloadTags() {
        Api.getTags()
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(res.text);
            }
        })
        .then(tags => {
            this._tags = tags;
            localStorage.setItem('tags', JSON.stringify(this._tags));
        })
        .catch(error => {
            console.error(error);
        });
    }
}

export default new TagsModel();