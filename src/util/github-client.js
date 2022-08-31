import axios from 'axios';

export default class GitHubApiRepository {
    #gitHubClient = axios.create({
        baseURL: 'https://api.github.com/'
    });

    #OWNER = 'jamesjtb';
    #REPO = 'uesrpg-companion';

    async getLatestRelease() {
        const response = await this.#gitHubClient.get(`/repos/${this.#OWNER}/${this.#REPO}/releases`);
        return response.data[0];
    }
}