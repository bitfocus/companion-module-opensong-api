module.exports = {
	getActions () {
		
		var actions = {
			'next': {
				label: 'Next Slide',
			},
			'previous': {
				label: 'Previous Slide',
			},
			'first': {
				label: 'First Slide',
			},
			'last': {
				label: 'Last Slide',
			},
			'sect_next': {
				label: 'Next Section',
			},
			'sect_previous': {
				label: 'Previous Section',
			},
			'current_song_section': {
				label: 'Current Song Section',
				options: [
					{
						type: 'dropdown',
						label: 'Section',
						id: 'section',
						default: 'chorus',
						choices: [
							{ 'id': 'chorus',    label: 'Chorus'     },
							{ 'id': 'bridge',    label: 'Bridge'     },
							{ 'id': 'prechorus', label: 'Pre-Chorus' },
							{ 'id': 'tag',       label: 'Tag'        },
						]
					}
				]
			},
			'current_song_verse': {
				label: 'Current Song Verse',
				options: [
					{
						type: 'number',
						label: 'Verse No.',
						id: 'number',
						default: 1,
						min: 0,
						max: 999,
					}
				]
			},
			'screen_normal': {
				label: 'Screen Normal Mode',
			},
			'screen_toggle': {
				label: 'Screen Toggle Mode',
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'mode',
						default: 'black',
						choices: [
							{ 'id': 'black',   label: 'Black'   },
							{ 'id': 'white',   label: 'White'   },
							{ 'id': 'hide',    label: 'Hide'    },
							{ 'id': 'logo',    label: 'Logo'    },
							{ 'id': 'freeze',  label: 'Freeze'  },
						]
					}
				]
			},
			'show_message': {
				label: 'Show Message',
				options: [
					{
						type: 'textinput',
						label: 'Message',
						id: 'message',
						default: ''
					}
				]
			},
			'hide_message': {
				label: 'Hide Message',
			},
			'close': {
				label: 'Close Presentation',
			},
		}

		return actions;
	}
}
