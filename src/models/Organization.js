import {getOrgInfo, getOrgRepos} from '@/api/orgs.api';
import Model from "@/models/Model";

/**
 *
 */
export default class Organization extends Model {

    /**
     *
     * @param name
     * @returns {Organization}
     */
    constructor(name) {
        super();
        this.name = name.toLowerCase();
        this.key = `org-${this.name}`;
        this.repos = `repos-${this.name}`;
        return this;
    }

    /**
     *
     * @returns {Promise<Organization>}
     */
    getInfo() {
        return new Promise((resolve, reject) => {
            const cached = Model._get(this.key);
            if (cached) {
                return resolve(cached);
            }
            getOrgInfo(this.name)
                .then((res) => {
                    Model._save(this.key, res.data)
                    return resolve(res.data);
                })
                .catch((err) => {
                    console.error(err);
                    return reject(err);
                });
        });
    }

    /**
     *
     * @returns {Promise<Organization>}
     */
    getRepos() {
        return new Promise((resolve, reject) => {
            const cached = Model._get(this.repos);
            if (cached) {
                return resolve(cached);
            }
            getOrgRepos(this.name)
                .then((res) => {
                    Model._save(this.repos, res.data);
                    return resolve(res.data);
                })
                .catch((err) => {
                    console.error(err);
                    return reject(err);
                });
        });
    }
}
