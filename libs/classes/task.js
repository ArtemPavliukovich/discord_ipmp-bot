const { v4: uuidv4 } = require('uuid');
const cron = require('node-cron');
const { client } = require('../../index');
const { tasks } = require('../../tasks');
const {
	timeZone,
	minutesForWarnAboutMeet,
	translateDays,
	messages,
	translateMonths,
} = require('../../config');

module.exports = class Task {
	constructor(name, month, day, date, hour, minute, users, channelId, guildId) {
		this.id = uuidv4();
		this.name = name.trim();
		this.month = month?.trim() || null;
		this.day = day?.trim() || null;
		this.date = +`${date}`?.trim().split('').map((el, i) => el === '0' && !i ? '' : el).join('') || null;
		this.hour = +`${hour}`.trim().split('').map((el, i) => el === '0' && !i ? '' : el).join('');
		this.minute = +`${minute}`.trim().split('').map((el, i) => el === '0' && !i ? '' : el).join('');
		this.users = users.match(/<@\d+>/g);
		this.roles = users.match(/<@&\d+>|@here|@everyone/g);
		this.channelId = channelId;
		this.guildId = guildId;
		this.task = null;
	}

	start() {
		const time = this.getTimeForStartTask();
		this.task = cron.schedule(time, () => {
			let usersIds;
			const channel = client.channels.cache.get(this.channelId);
			const guild = client.guilds.cache.get(this.guildId);

			if (this.roles && (this.roles.includes('@here') || this.roles.includes('@everyone'))) {
				const roleHere = this.roles.includes('@here') ? '@here' : null;
				const roleEveryone = this.roles.includes('@everyone') ? '@everyone' : null;
				const roleName = roleHere || roleEveryone;
				// test
				usersIds = new Set(guild.members.cache.filter(member => {
					return member.roles.cache.some(role => {
						return role.name === roleName && !role.name.includes('Bot');
					});
				}).map(member => member.user.id));
			} else {
				let result = [];

				if (this.users) {
					const givenUsersIds = this.users.join('').match(/\d+/g);
					result = result.concat(givenUsersIds);
				}

				if (this.roles) {
					// test 2 roles
					const givenRolesIds = this.roles.join('').match(/\d+/g);
					const givenUsersIds = guild.members.cache.filter(member => {
						return member.roles.cache.some(role => {
							return givenRolesIds.includes(`${role.id}`) && !role.name.includes('Bot');
						});
					}).map(member => member.user.id);
					result = result.concat(givenUsersIds);
				}

				usersIds = new Set(result);
			}
			console.log(usersIds); //
			for (let userId of usersIds) {
				client.users.send(
					userId,
					messages.userMessage(userId, this.name, this.getStringTime()),
				);
			}

			channel.send(messages.channelMessage(
				this.name,
				this.users,
				this.roles,
				this.getStringTime(),
			));

			if (this.month) {
				setTimeout(() => this.stop(), 0);
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
			tasks.delete(this.id);
			return true;
		}
	}

	getStringDate() {
		let result;
		const time = this.getStringTime();

		if (this.month) {
			result = `${this.date} ${translateMonths[this.month]} в ${time} (${timeZone})`;
		} else {
			result = `по ${translateDays[this.day]} в ${time} (${timeZone})`;
		}

		return result;
	}

	getStringTime() {
		const hour = `${this.hour}`.length === 1 ? `0${this.hour}` : this.hour;
		const minute = `${this.minute}`.length === 1 ? `0${this.minute}` : this.minute;
		return `${hour}:${minute}`;
	}

	checkDateInMonth() {
		if (this.month) {
			const year = new Date().getFullYear();
			const date = new Date(`${this.month} ${this.date}, ${year} 12:00:00`);
			const options = {month: 'long'};
			const month = new Intl.DateTimeFormat('en-US', options).format(date).toLowerCase();
			return this.month === month;
		}

		return true;
	}

	getTimeForStartTask() {
		let time;
		// const currentDate = new Date(); // меньше чем 15 минут до встречи, прошедшая дата
		const minute = this.minute >= minutesForWarnAboutMeet
			? this.minute - minutesForWarnAboutMeet
			: 60 + this.minute - minutesForWarnAboutMeet;

		const hour = this.minute >= minutesForWarnAboutMeet
			? this.hour
			: this.hour ? this.hour - 1 : 23;

		if (this.month) {
			time = `${minute} ${hour} ${this.date} ${this.month} *`;
		} else {
			time = `${minute} ${hour} * * ${this.day}`;
		}

		return time;
	}
};
