module.exports = {
	
	setVariables() {
		this.setVariableDefinitions([
			{
				label: 'Song Title',
				name: 'song_title'
			}
		]);
	},

	updateVariables() {
		let title;

		if (this.states.hasOwnProperty('title')) {
			title = this.states['title'];
		} else {
			title = 'Song Title';
		}
		this.setVariable('song_title', title);
	}
}