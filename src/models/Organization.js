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
        this.name = name;
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
            const cached = this.get(this.key);
            if (cached) {
                return resolve(JSON.parse(cached));
            }
            getOrgInfo(this.name)
                .then((res) => {
                    this.save(this.key, JSON.stringify(res.data))
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
            const cached = this.get(this.repos);
            if (cached) {
                return resolve(JSON.parse(cached));
            }
            getOrgRepos(this.name)
                .then((res) => {
                    this.save(this.repos, JSON.stringify(res.data))
                    return resolve(res.data);
                })
                .catch((err) => {
                    console.error(err);
                    return reject(err);
                });
        });
    }
}
