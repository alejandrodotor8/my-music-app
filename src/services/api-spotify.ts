import axios, { AxiosInstance } from 'axios';

class SpotifyApi {
	token: string = '';
	api: AxiosInstance;
	constructor(token: string) {
		this.token = token;
		this.api = this.generateAxiosInstance();
	}
	generateAxiosInstance() {
		const axiosInstance = axios.create({
			baseURL: 'https://api.spotify.com/v1',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + this.token,
			},
		});
		axiosInstance.interceptors.response.use(
			(response) => {
				return response;
			},
			(err) => {
				console.log(err);
				if (err.response.data.message === 'The access token expired') {
					localStorage.removeItem('token_spotify');
					location.reload();
				}
				return err;
			}
		);
		return axiosInstance;
	}

	async getCurrentUser() {
		const res = await this.api('/me');
		return res;
	}
	async getCurrentUserTracks() {
		const res = await this.api('/me/tracks');
		return res;
	}
	async getPlaylist(playlist_id: string) {
		const res = await this.api(`playlists/${playlist_id}`);
		return res;
	}
	async getPlaylistTracks(playlist_id: string) {
		const res = await this.api(`playlists/${playlist_id}/tracks`);
		return res;
	}
}

export { SpotifyApi };
