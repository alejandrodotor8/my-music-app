import axios, { AxiosInstance } from 'axios';
import type { IPlaylistFav } from '../shared/types';
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
				const errorMsg = err.response.data.error.message;
				if (errorMsg === 'The access token expired') {
					window.localStorage.removeItem('token');
					window.location.reload();
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
	async getCurrentUserPlaylist(limit: number, offset: number = 0) {
		const res = await this.api('/me/playlists', {
			params: { limit, offset },
		});
		return res;
	}
	async getPlaylist(playlistID: string) {
		const res = await this.api(`playlists/${playlistID}`);
		return res;
	}
	async getPlaylistTracks(playlistID: string) {
		const res = await this.api(`playlists/${playlistID}/tracks`);
		return res;
	}
	async createFavPlaylist(userID: string): Promise<IPlaylistFav> {
		const res = await this.api.post(`/users/${userID}/playlists`, {
			name: 'favorites_',
			description: 'favorites tracks from music.alejandrodotor.com',
		});
		return {
			id: res.data.id,
			name: res.data.name,
			image: res.data.images[0]?.url || '',
			description: res.data.description,
		};
	}
	async getFavoritesPlaylist(
		userID: string,
		limit: number = 10,
		offset: number = 0
	): Promise<any> {
		const res = await this.getCurrentUserPlaylist(limit, offset);
		const playlistFav = res.data.items.find(
			(item: any) => item.name === 'favorites_'
		);
		//no existe en Res y hay Next
		if (!playlistFav && res.data.next) {
			return await this.getFavoritesPlaylist(userID, limit, offset + limit);
			//No existe en Res y no hay res
		} else if (!playlistFav && !res.data.next) {
			const res = await this.createFavPlaylist(userID);
			console.log('Creada');
			return res;
		}
		//La playlist existe
		return {
			id: playlistFav.id,
			name: playlistFav.name,
			image: playlistFav.images[0]?.url || '',
			description: playlistFav.description,
		};
	}
	async addTrackFavPlaylist(favPlaylistID: string, trackID: string) {
		const res = await this.api.post(`/playlists/${favPlaylistID}/tracks`, {
			uris: [`spotify:track:${trackID}`],
			position: 0,
		});
		return res;
	}
	async removeTrackFavPlaylist(favPlaylistID: string, trackID: string) {
		const res = await this.api.delete(`/playlists/${favPlaylistID}/tracks`, {
			data: { tracks: [{ uri: `spotify:track:${trackID}` }] },
		});
		return res;
	}
	async searchTrackItem(searchValue: string) {
		const res = await this.api('search', {
			params: { q: searchValue, type: 'track', limit: 20 },
		});
		return res;
	}
}

export { SpotifyApi };
