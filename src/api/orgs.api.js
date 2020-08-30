import httpClient from './httpClient';

/**
 * Retrieves the organization details
 * Docs: https://docs.github.com/en/rest/reference/orgs#get-an-organization
 *
 * @param orgName (the organization's name)
 * @returns {Promise<AxiosResponse<any>>}
 */
const getOrgInfo = (orgName) => httpClient.get(`/orgs/${orgName}`);

/**
 * Retrieves the list of repositories for a given organization
 * Docs: https://docs.github.com/en/rest/reference/repos#list-organization-repositories
 *
 * @param orgName (the organization's name)
 * @returns {Promise<AxiosResponse<any>>}
 */
const getOrgRepos = (orgName) => httpClient.get(`/orgs/${orgName}/repos`);

export {
    getOrgRepos,
    getOrgInfo
}
