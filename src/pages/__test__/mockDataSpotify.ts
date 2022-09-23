const searchResult = {
	data: {
		tracks: {
			items: [
				{
					album: {
						images: [
							{
								height: 640,
								url: 'https://i.scdn.co/image/ab67616d0000b273c9f744b0d62da795bc21d04a',
								width: 640,
							},
						],
					},
					artists: [
						{
							name: 'Manuel Turizo',
						},
					],
					id: '5ww2BF9slyYgNOk37BlC4u',
					name: 'La Bachata',
					preview_url:
						'https://p.scdn.co/mp3-preview/296da587969e145427d963bbe0680d9a25f61db8?cid=8c87272c262b4a81b19e595464e39c6c',
				},
				{
					album: {
						images: [
							{
								height: 640,
								url: 'https://i.scdn.co/image/ab67616d0000b273c9f744b0d62da795bc21d04a',
								width: 640,
							},
						],
					},
					artists: [
						{
							name: 'Alejandro Dotor',
						},
					],
					id: '5ww2BF9slyYgNOk37BlC6756',
					name: 'La App',
					preview_url:
						'https://p.scdn.co/mp3-preview/296da587969e145427d963bbe0680d9a25f61db8?cid=8c87272c262b4a81b19e595464e39c6c',
				},
			],
		},
	},
};
const timeout = (time: number, data: {}) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(data);
		}, time);
	});
};
export class MockSpotifyApi {
	async searchTrackItem() {
		const res = await timeout(1000, searchResult);

		return res;
	}
}
