/**
 * Provides an abstraction for getting and setting data
 * One idea for scaling the app, is that this can be refactored
 * to use a distributed hash table
 */
export default class Model {

    /**
     * Gets object from storage
     *
     * @param key
     * @return {null|any}
     * @private
     */
    static _get(key) {
        const list = localStorage.getItem(key);
        if (list) {
            return JSON.parse(list);
        }
        return null;
    }

    /**
     * Save object to storage and assigns to key
     *
     * @param key
     * @param data
     * @private
     */
    static _save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    /**
     * Removes key from storage
     *
     * @param key
     * @private
     */
    static _remove(key) {
        localStorage.removeItem(key);
    }
}