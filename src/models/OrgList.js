import Model from '@/models/Model';

/**
 *
 */
export default class OrgList extends Model {

    /**
     *
     * @return {OrgList}
     */
    constructor() {
        super();
        this.key = 'list';
        return this;
    }

    /**
     *
     * @return {*[]|Model|String}
     */
    getList() {
        return this.get(this.key) || JSON.stringify([]);
    }

    /**
     *
     * @param orgName
     * @return {*}
     */
    hasOrg(orgName) {
        const cached = JSON.parse(this.getList());
        if (!cached) return false;
        return Array.from(cached).find((org) => orgName === org.login);
    }

    /**
     *
     * @param org {Organization}
     * @return {*[]|Model|String}
     */
    add(org) {
        const list = JSON.parse(this.getList());
        list.push(org);
        this.save(this.key, JSON.stringify(list));
        return list;
    }
}