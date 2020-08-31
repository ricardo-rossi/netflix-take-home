import Model from '@/models/Model';
import {getRepoBranches, getRepoCommits, getRepoContributors, getRepoInfo} from '@/api/repos.api';

export default class Repository extends Model {

    constructor(orgName, repoName) {
        super();
        this.orgName = orgName.trim().toLowerCase();
        this.repoName = repoName.trim().toLowerCase();
        this.base = `org-${orgName}-repo-${repoName}`;
        this.commitsKey = this.base + '-commits';
        this.branchesKey = this.base + '-branches';
        this.contribKey = this.base + '-contrib';
        return this;
    }

    getInfo() {
        return new Promise((resolve, reject) => {
            const cached = Model._get(this.base);
            if (cached) {
                return resolve(cached);
            }
            getRepoInfo(this.orgName, this.repoName)
                .then((res) => {
                    Model._save(this.base, res.data);
                    return resolve(res.data);
                })
                .catch((err) => {
                    console.error(err);
                    return reject(err);
                });
        });
    }

    getCommits() {
        return new Promise((resolve, reject) => {
            const cached = Model._get(this.commitsKey);
            if (cached) {
                return resolve(cached);
            }
            getRepoCommits(this.orgName, this.repoName)
                .then((res) => {
                    Model._save(this.commitsKey, res.data);
                    return resolve(res.data);
                })
                .catch((err) => {
                    console.error(err);
                    return reject(err);
                });
        });
    }

    getBranches() {
        return new Promise((resolve, reject) => {
            const cached = Model._get(this.branchesKey);
            if (cached) {
                return resolve(cached);
            }
            getRepoBranches(this.orgName, this.repoName)
                .then((res) => {
                    Model._save(this.branchesKey, res.data);
                    return resolve(res.data);
                })
                .catch((err) => {
                    console.error(err);
                    return reject(err);
                });
        });
    }

    getContributors() {
        return new Promise((resolve, reject) => {
            const cached = Model._get(this.contribKey);
            if (cached) {
                return resolve(cached);
            }
            getRepoContributors(this.orgName, this.repoName)
                .then((res) => {
                    Model._save(this.contribKey, res.data);
                    return resolve(res.data);
                })
                .catch((err) => {
                    console.error(err);
                    return reject(err);
                });
        });
    }

}