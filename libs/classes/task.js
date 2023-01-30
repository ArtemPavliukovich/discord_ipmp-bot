const moment = require('moment-timezone');
const { v4: uuidv4 } = require('uuid');
const cron = require('node-cron');
const { client } = require('../../index');
const { timeZone, minutesForWarnAboutMeet, translateDays, messages } = require('../../config');

module.exports = class Task {
	constructor(name, month, day, date, hour, minute, users, channelId, guildId) {
		this.id = uuidv4();
		this.name = name.trim();
		this.year = new Date().getFullYear(),
		this.month = month?.trim() || null;
		this.date = +`${date}`?.trim() || null;
		this.day = day?.trim() || null;
		this.hour = +`${hour}`.trim();
		this.minute = +`${minute}`.trim();
		this.users = users.match(/<@\d+>/g);
		this.roles = users.match(/<@&\d+>|@here|@everyone/g);
		this.channelId = channelId;
		this.guildId = guildId;
		this.task = null;
	}

	start() {
		const minute = this.minute >= minutesForWarnAboutMeet
			? this.minute - minutesForWarnAboutMeet
			: 60 + this.minute - minutesForWarnAboutMeet;

		const hour = 	this.minute >= minutesForWarnAboutMeet
			? this.hour
			: this.hour ? this.hour - 1 : 23;
		// hour < 0 ???
		const time = this.month
			? `${minute} ${hour} ${this.date} ${this.month} *`
			: `${minute} ${hour} * * ${this.day}`;

		this.task = cron.schedule(time, () => {
			let usersId;
			const channel = client.channels.cache.get(this.channelId);
			const guild = client.guilds.cache.get(this.guildId);

			if (this.roles && (this.roles.includes('@here') || this.roles.includes('@everyone'))) {
				usersId = new Set(guild.members.cache.map(member => member.user.id));
			} else {
				const givenUsersId = this.users?.join('').match(/\d+/g);
				// const roles = this.roles?.join('').match(/\d+/g);
				usersId = new Set([...givenUsersId]);
			}

			for (let userId of usersId) {
				client.users.send(userId, messages.userMessage(
					userId,
					this.name,
					`${this.hour}:${this.minute}`, // поправить если 01
				));
			}

			channel.send(messages.channelMessage());

			if (this.month) {
				setTimeout(() => {
					this.stop();
				}, 0);
			}
		}, {
			scheduled: false,
			timezone: timeZone,
		});

		this.task.start();
		return true;
	}

	stop() {
		if (this.task) {
			this.task.stop();
			return true;
		}
	}

	getStringDate() {
		let result;
		const hour = `${this.hour}`.length === 1 ? `0${this.hour}` : this.hour;
		const minute = `${this.minute}`.length === 1 ? `0${this.minute}` : this.minute;
		const time = `${hour}:${minute}`;

		if (this.month) {
			const date = new Date(`${this.month} ${this.date}, ${this.year} ${time}:00`);
			result = `${moment.tz(date, timeZone).locale('ru').format('LL')} в ${time} (${timeZone})`;
		} else {
			result = `по ${translateDays[this.day]} в ${time} (${timeZone})`;
		}

		return result;
	}

	checkDateInMonth() {
		if (this.month) {
			// не работает
			const date = moment(new Date(`${this.month} ${this.date}, ${this.year} 12:00`));
			return date.isValid();
		}

		return true;
	}
};
