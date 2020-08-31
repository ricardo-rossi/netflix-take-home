import httpClient from './httpClient';

/**
 * Retrieves the repository's details
 * Docs: https://docs.github.com/en/rest/reference/repos#get-a-repository
 *
 * @param orgName (the organization's name)
 * @param repoName (the repository's name)
 * @returns {Promise<AxiosResponse<any>>}
 */
const getRepoInfo = (orgName, repoName) => httpClient.get(`/repos/${orgName}/${repoName}`);

/**
 * Retrieves the list of commits for a repository
 * Docs: https://docs.github.com/en/rest/reference/repos#list-commits
 *
 * @param orgName (the organization's name)
 * @param repoName (the repository's name)
 * @returns {Promise<AxiosResponse<any>>}
 */
const getRepoCommits = (orgName, repoName) => httpClient.get(`/repos/${orgName}/${repoName}/commits`);

/**
 * Retrieves the list of contributors for a repository
 * Docs: https://docs.github.com/en/rest/reference/repos#list-repository-contributors
 *
 * @param orgName (the organization's name)
 * @param repoName (the repository's name)
 * @returns {Promise<AxiosResponse<any>>}
 */
const getRepoContributors = (orgName, repoName) => httpClient.get(`/repos/${orgName}/${repoName}/contributors`);

/**
 * Retrieves the list of branches for a repository
 * Docs: https://docs.github.com/en/rest/reference/repos#list-branches
 *
 * @param orgName (the organization's name)
 * @param repoName (the repository's name)
 * @returns {Promise<AxiosResponse<any>>}
 */
const getRepoBranches = (orgName, repoName) => httpClient.get(`/repos/${orgName}/${repoName}/branches`);

export {
    getRepoInfo,
    getRepoCommits,
    getRepoContributors,
    getRepoBranches
}
