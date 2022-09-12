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
				if (response.status === 401 && response.statusText) {
					console.log('error en consulta IF');
				}
				console.log(response);
				return response;
			},
			(err) => {
				console.log('entro a err:', err);
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
