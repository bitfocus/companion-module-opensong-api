module.exports = {
	initPresets() {
		var presets = []
		presets.push({
				category: 'Navigation',
				label: 'Next',
				bank: {
					style: 'text',
					text: 'Next Slide',
					size: 'auto',
					color: this.rgb(255,255,255),
					bgcolor: this.rgb(0,0,0),
				},
				actions: [
					{
						action: 'next',
					}
				],
			},
			{
				category: 'Navigation',
				label: 'Previous',
				bank: {
					style: 'text',
					text: 'Prev Slide',
					size: 'auto',
					color: this.rgb(255,255,255),
					bgcolor: this.rgb(0,0,0),
				},
				actions: [
					{
						action: 'previous',
					}
				],
			},
			{
				category: 'Navigation',
				label: 'First',
				bank: {
					style: 'text',
					text: 'First Slide',
					size: 'auto',
					color: this.rgb(255,255,255),
					bgcolor: this.rgb(0,0,0),
				},
				actions: [
					{
						action: 'first',
					}
				],
			},
			{
				category: 'Navigation',
				label: 'Last',
				bank: {
					style: 'text',
					text: 'Last Slide',
					size: 'auto',
					color: this.rgb(255,255,255),
					bgcolor: this.rgb(0,0,0),
				},
				actions: [
					{
						action: 'last',
					}
				],
			},
			{
				category: 'Navigation',
				label: 'Next Section',
				bank: {
					style: 'text',
					text: 'Next Section',
					size: 'auto',
					color: this.rgb(255,255,255),
					bgcolor: this.rgb(0,0,0),
				},
				actions: [
					{
						action: 'sect_next',
					}
				],
			},
			{
				category: 'Navigation',
				label: 'Previous Section',
				bank: {
					style: 'text',
					text: 'Prev Section',
					size: 'auto',
					color: this.rgb(255,255,255),
					bgcolor: this.rgb(0,0,0),
				},
				actions: [
					{
						action: 'sect_previous',
					}
				],
			},
			{
				category: 'Current Song',
				label: 'Song Title',
				bank: {
					style: 'text',
					text: `\$(${this.config.label}:song_title)`,
					size: 'auto',
					color: this.rgb(255,255,255),
					bgcolor: this.rgb(0,0,0),
				},
			},
			{
				category: 'Current Song',
				label: 'Current Song Verse',
				bank: {
					style: 'text',
					text: 'Verse',
					size: 'auto',
					color: this.rgb(255,255,255),
					bgcolor: this.rgb(0,0,0),
				},
				actions: [{
					action: 'current_song_verse',
					options: {
						number: 1,
					}
				}]
			},
		)
		
		//Define current song parameters
		songSections = [
			{ id: 'Chorus',      action: 'current_song_section', action_option: 'chorus'    },
			{ id: 'Bridge',      action: 'current_song_section', action_option: 'bridge'    },
			{ id: 'Pre-Chorus',  action: 'current_song_section', action_option: 'prechorus' },
			{ id: 'Tag',         action: 'current_song_section', action_option: 'tag'       },
		];
		//Create preset for each section
		songSections.forEach( (item) => {
			presets.push({
				category: 'Current Song',
				label: `${item.id}`,
				bank: {
					style: 'text',
					text: item.id,
					size: 'auto',
					color: this.rgb(255,255,255),
					bgcolor: this.rgb(0,0,0),
				},
				actions: [{
					action: item.action,
					options: {
						section: item.action_option
					}
				}],
			});
		});

		//Define mode preset parameters
		screenModes = [
			{ id: 'Normal',  action: 'screen_normal', action_option: null,      feedback: 'mode', feedback_option: 'N' },
			{ id: 'Black',   action: 'screen_toggle', action_option: 'black',   feedback: 'mode', feedback_option: 'B' },
			{ id: 'White',   action: 'screen_toggle', action_option: 'white',   feedback: 'mode', feedback_option: 'W' },
			{ id: 'Hide',    action: 'screen_toggle', action_option: 'hide',    feedback: 'mode', feedback_option: 'H' },
			{ id: 'Logo',    action: 'screen_toggle', action_option: 'logo',    feedback: 'mode', feedback_option: 'L' },
			{ id: 'Freeze',  action: 'screen_toggle', action_option: 'freeze',  feedback: 'mode', feedback_option: 'F' },
		];
		//Create presets for each mode
		screenModes.forEach( (item) => {
			presets.push({
				category: 'Screen Modes',
				label: `Screen Mode ${item.id}`,
				bank: {
					style: 'text',
					text: item.id,
					size: 'auto',
					color: this.rgb(255,255,255),
					bgcolor: this.rgb(0,0,0),
				},
				actions: [{
					action: item.action,
					options: {
						mode: item.action_option
					}
				}],
				feedbacks: [{
					type: item.feedback,
					options: {
						mode: item.feedback_option,
						fg: this.rgb(255, 255, 255), 
						bg: this.rgb(255, 0, 0),
					}
				}]
			});
		});
		this.setPresetDefinitions(presets);
	}
}