import Model from '@/models/Model';
import Organization from '@/models/Organization';

/**
 *
 */
class OrgList extends Model {

    constructor() {
        super();
        this.key = 'list';
        return this;
    }

    /**
     *
     * @param orgName
     * @return {*}
     */
    has(orgName) {
        const key = orgName.toLowerCase();
        const list = this.getList();
        if (!list) return false;
        return Array.from(list).find((org) => key === org.login.toLowerCase());
    }

    getList() {
        return Model._get(this.key) || [];
    }

    /**
     *
     * @param org {Organization}
     * @return {*[]|Model|String}
     */
    add(org) {
        const list = this.getList();
        list.push(org);
        Model._save(this.key, list);
        return list;
    }

    async addOrgByName(orgName) {
        return new Promise((resolve, reject) => {
            const org = new Organization(orgName);
            Promise.all([
                org.getInfo(),
                org.getRepos()
            ]).then(([orgInfo, orgRepos]) => {
                let org = orgInfo;
                org.repos = orgRepos;
                if (this.has(org.login)) {
                    return reject(`${org.login} is already in your repository list`);
                } else {
                    return resolve(this.add(orgInfo));
                }
            }).catch((err) => {
                return reject(err);
            });
        });
    }

    remove(orgName) {
        const key = orgName.toLowerCase();
        Model._remove(`org-${key}`);
        Model._remove(`repos-${key}`);
        let list = Array.from(this.getList())
            .filter((org) => key !== org.login.toLowerCase());
        Model._save(this.key, list);
    }
}

const instance = new OrgList();
Object.freeze(instance);

export default instance;