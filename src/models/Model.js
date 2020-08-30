/**
 *
 */
export default class Model {

    /**
     *
     * @param key
     * @returns {Model|String}
     * */
    get(key) {
        return localStorage.getItem(key);
    }

    /**
     *
     * @param key
     * @param data
     */
    save(key, data) {
        localStorage.setItem(key, data);
    }
}