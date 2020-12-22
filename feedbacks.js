module.exports = {
	getFeedbacks() {
		var feedbacks = {
			'mode': {
				label: 'Screen Mode Active',
				description: 'Change background based on active screen mode',
				options: [{
					type: 'colorpicker',
					label: 'Foreground color',
					id: 'fg',
					default: this.rgb(255,255,255)
				}, {
					type: 'colorpicker',
					label: 'Background color',
					id: 'bg',
					default: this.rgb(255,0,0)
				}, {
					type: 'dropdown',
					label: 'Mode',
					id: 'mode',
					default: 'B',
					choices: [
						{id: 'N', label: 'Normal' },
						{id: 'B', label: 'Black' },
						{id: 'W', label: 'White' },
						{id: 'H', label: 'Hidden' },
						{id: 'L', label: 'Logo' },
						{id: 'F', label: 'Frozen'}

					]
				}],
				callback: (feedback, bank) => {

					if (this.states['mode'] == feedback.options.mode) {
						return {
							color: feedback.options.fg,
							bgcolor: feedback.options.bg
						};
					}
				}
			},
			'running': {
				label: 'Presentation Active',
				description: 'Change background when presentation active',
				options: [{
					type: 'colorpicker',
					label: 'Foreground color',
					id: 'fg',
					default: this.rgb(255,255,255)
				}, {
					type: 'colorpicker',
					label: 'Background color',
					id: 'bg',
					default: this.rgb(255,0,0)
				}],
				callback: (feedback, bank) => {

					if (this.states['running'] == true) {
						return {
							color: feedback.options.fg,
							bgcolor: feedback.options.bg
						};
					}
				}
			}
		}
		return feedbacks
	}
}