/**
 *
 */
export default class Model {

    static _get(key) {
        const list = localStorage.getItem(key);
        if (list) {
            return JSON.parse(list);
        }
        return null;
    }

    /**
     *
     * @param key
     * @param data
     */
    static _save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static _remove(key) {
        localStorage.removeItem(key);
    }
}