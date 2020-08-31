import {getOrgInfo, getOrgRepos} from '@/api/orgs.api';
import Model from "@/models/Model";

/**
 * Organization model
 */
export default class Organization extends Model {

    /**
     * Organization
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
     * Gets Organization's metadata
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
                    return reject(err);
                });
        });
    }

    /**
     * Get Organization's repositories
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
                    return reject(err);
                });
        });
    }
}
