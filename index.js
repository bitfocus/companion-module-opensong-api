var instance_skel = require('../../instance_skel');
var WebSocket     = require('ws');

var actions   = require('./actions');
var feedbacks = require('./feedbacks');
var variables = require('./variables');
var presets   = require('./presets');

var debug;
var log;

class instance extends instance_skel {

	constructor(system,id,config) {
		super(system,id,config);

		Object.assign(this, {
			...actions,
			...feedbacks,
			...variables,
			...presets,
		});

		this.states = {};
		this.actions();
	}

	actions() {
		this.setActions(this.getActions());
	}

	//Execute provided action
	action(action) {
		let opt = action.options;
		let cmd;

		//For instance feedbacks
		this.checkSocketAlive();
		
		switch (action.action) {

			case 'next':
				cmd = 'presentation/slide/next';
				break
			case 'previous':
				cmd = 'presentation/slide/previous';
				break
			case 'first':
				cmd = 'presentation/slide/first';
				break
			case 'last':
				cmd = 'presentation/slide/last';
				break
			case 'sect_next':
				cmd = 'presentation/section/next';
				break
			case 'sect_previous':
				cmd = 'presentation/section/previous';
				break
			case 'current_song_section':
				cmd = 'presentation/song/current/'+ opt.section;
				break
			case 'current_song_verse':
				cmd = 'presentation/song/current/verse/verse:' +opt.number;
				break
			case 'screen_normal':
				cmd = 'presentation/screen/normal';
				break
			case 'screen_toggle':
				cmd = 'presentation/screen/' + opt.mode;
				break
			case 'show_message':
				cmd = 'presentation/screen/alert/message:' + opt.message;
				break
			case 'hide_message':
				cmd = 'presentation/screen/alert/message:';
				break
			case 'close':
				cmd = 'presentation/close'
				break
		}
		//Send POST command
		if (cmd != undefined){

			cmd = `http://${this.config.host}:${this.config.port}/${cmd}`;

			if(!!this.config.auth){
				let headers = {};
				headers['Authorization'] = `Basic ${Buffer.from(this.config.auth).toString('base64')}`;

				this.system.emit('rest', cmd, {}, (err,result) => {
					if (err !== null) {
						this.log('error', 'HTTP POST Failed (' + result.error + ')');
						this.status(this.STATUS_ERROR, result.error.code)
					} else {
						this.status(this.STATUS_OK);
					}
				}, 
				headers);
			}
			else {
				this.system.emit('rest', cmd, {}, (err,result) => {
					if (err !== null) {
						this.log('error', 'HTTP POST Failed (' + result.error + ')');
						this.status(this.STATUS_ERROR, result.error.code)
					} else {
						this.status(this.STATUS_OK);
					}
				});
			}
		}
	}

	//Define configuration fields for web config
	config_fields() {
		return [
			{
				type: 'textinput',
				id:   'host',
				label: 'Target IP',
				default: '',
				width: 6,
				regex: this.REGEX_IP
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'API Port',
				width: 4,
				default: '8082',
				regex: this.REGEX_PORT
			},
			{
				type: 'textinput',
				id: 'auth',
				label: 'API Authentication Key',
				width: 6,
				default: null
			},
		]
	}

	//Clean up intance before it is destroyed
	destroy() {
		this.destroyed = true;

		if (this.socket !== undefined) {
			this.socket.send('/ws/unsubscribe/presentation');
			this.socket.close();
		}
		
		this.debug('DESTROY', this.id);
	}

	//Main init function called on start
	init() {
		debug = this.debug;
		log = this.log;

		this.initFeedbacks();
		this.initWS();
		this.setVariables();
		this.initPresets();
	}

	initWS() {
		this.socket = new WebSocket(`ws://${this.config.host}:${this.config.port}/ws`);
		this.status(this.STATUS_WARNING, 'Connecting')

		this.socket.on('open', () => {
			this.log('info', 'Opened WebSocket to OpenSong - Feedbacks Available');
			this.socket.send('/ws/subscribe/presentation');
			this.status(this.STATUS_OK, 'OK');
		});
		this.socket.on('error', (err) => {
			this.log('error', err.message);
		});
		this.socket.on('close', (code, reason) => {
			if (!this.destroyed) this.status(this.STATUS_WARNING, 'No Connection');
			this.log('error', 'OpenSong Websocket Connection Closed - No Feedbacks');
			this.debug('Websocket closed with code:' + code);
		});
		this.socket.on('message', (message) => {
			this.processMessage(message);
		});
	}

	checkSocketAlive() {
		if (this.socket.readyState === WebSocket.CLOSED || this.socket === undefined) {
			//Attempt Reconnect
			this.debug('Socket is closed attempting recoonnect');
			this.initWS();
		}
	}

	initFeedbacks() {
		this.setFeedbackDefinitions(this.getFeedbacks());
	}

	processMessage(message) {
		if (message.includes("not available")) {
			return
		}

		var regex_title = /<title>(.*)<\/title>/gm;
		var title = regex_title.exec(message);
		if (title !== null && title.length >= 2) {
			this.states['title'] = title[1];
			this.updateVariables();
		}

		var regex_mode = /<screen mode="(\S)">/gm;
		var mode = regex_mode.exec(message);
		if (mode !== null && mode.length >= 2) {
			this.states['mode'] = mode[1];
			this.checkFeedbacks('mode');
		}

		var regex_running = /<presentation running="(\d)">/gm;
		var running = regex_running.exec(message);
		if (running !== null) {
			this.states['running'] = true;
			this.checkFeedbacks('running');
		} else {
			this.states = {};
			this.states['running'] = false;
			this.checkFeedbacks('running');
			this.updateVariables();
		}
	} 
	//On Config changes apply new config
	updateConfig(config) {
		var resetConnection = false;

		if (this.config != config) {
			resetConnection = true;
		}

		this.config = config;

		this.actions();
		this.initFeedbacks();
		this.initPresets();

		if (resetConnection === true || this.socket === undefined) {
			this.initWS();
		}
	}
}
exports = module.exports = instance;