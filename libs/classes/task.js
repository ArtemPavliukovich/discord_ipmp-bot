const Cron = require('croner');
const { client } = require('../../index');
const {
	timezone,
	minutesForWarnAboutMeet,
	translateDays,
	messages,
	translateMonths,
} = require('../../config');

module.exports = class Task {
	constructor(id, name, month, day, date, hour, minute, users, channelId, guildId, year) {
		this.id = id;
		this.name = name.trim();
		this.month = month?.trim() || null;
		this.day = day?.trim() || null;
		this.date = +`${date}`?.trim().split('').map((el, i) => el === '0' && !i ? '' : el).join('') || null;
		this.hour = +`${hour}`.trim().split('').map((el, i) => el === '0' && !i ? '' : el).join('');
		this.minute = +`${minute}`.trim().split('').map((el, i) => el === '0' && !i ? '' : el).join('');
		this.users = typeof users === 'string' ? users.match(/<@&\d+>|@here|@everyone|<@\d+>/g) : users;
		this.channelId = channelId;
		this.guildId = guildId;
		this.year = year;
		this.task = null;
	}

	start() {
		const time = this.getTimeForStartTask();

		if (time) {
			this.task = Cron(time, {timezone, legacyMode: false}, async () => {
					let usersIds = [];
					const users = this.users.join('').match(/<@\d+>/g);
					const roles = this.users.join('').match(/<@&\d+>|@here|@everyone/g);
					const channel = client.channels.cache.get(this.channelId);
					const guild = client.guilds.cache.get(this.guildId);
					const allMembers = await guild.members.fetch();

					if (roles && (roles.includes('@here') || roles.includes('@everyone'))) {
						for (let member of allMembers.values()) {
							if (!member.user.bot) {
								usersIds.push(member.user.id);
							}
						}
					} else {
						if (users) {
							const givenUsersIds = users.join('').match(/\d+/g);
							usersIds = usersIds.concat(givenUsersIds);
						}

						if (roles) {
							const filteredUsersIds = [];
							const givenRolesIds = roles.join('').match(/\d+/g);

							for (let member of allMembers.values()) {
								if (!member.user.bot) {
									const isUserHaveRole = member.roles.cache.some(role => givenRolesIds.includes(`${role.id}`));

									if (isUserHaveRole) {
										filteredUsersIds.push(member.user.id);
									}
								}
							}

							usersIds = usersIds.concat(filteredUsersIds);
						}
					}

					for (let userId of new Set(usersIds)) {
						client.users.send(userId, messages.userMessage(userId, this.name, this.getStringTime()));
					}

					channel.send(messages.channelMessage(this.name, this.users, this.getStringTime()));

					if (this.month) {
						this.stop();
					}
				});
		} else {
			this.task = null;
		}

		return true;
	}

	stop() {
		this.task?.stop();
		this.task = null;
	}

	getStringDate() {
		const time = this.getStringTime();
		const result = this.month
			? `${this.date} ${translateMonths[this.month]} в ${time} (${timezone})`
			: `по ${translateDays[this.day]} в ${time} (${timezone})`;
		return result;
	}

	getStringTime() {
		const hour = `${this.hour}`.length === 1 ? `0${this.hour}` : this.hour;
		const minute = `${this.minute}`.length === 1 ? `0${this.minute}` : this.minute;
		return `${hour}:${minute}`;
	}

	checkDateInMonth() {
		if (this.month) {
			const date = new Date(`${this.month} ${this.date}, ${this.year} 12:00:00`);
			const options = {month: 'long'};
			const month = new Intl.DateTimeFormat('en-US', options).format(date).toLowerCase();
			return this.month === month;
		}

		return true;
	}

	checkTimeForStartTask() {
		if (this.month) {
			const date = new Date(`${this.month} ${this.date}, ${this.year} ${this.getStringTime()}:00`);
			return date.getTime() - Date.now() > minutesForWarnAboutMeet * 60000;
		}

		return true;
	}

	// !если бот запускается и есть какие-то встречи в базе меньше 15 минут, не будет напоминания
	getTimeForStartTask() {
		if (this.checkTimeForStartTask()) {
			const minute = this.minute >= minutesForWarnAboutMeet
				? this.minute - minutesForWarnAboutMeet
				: 60 + this.minute - minutesForWarnAboutMeet;

			const hour = this.minute >= minutesForWarnAboutMeet
				? this.hour
				: this.hour ? this.hour - 1 : 23;

			return this.month
				? `${minute} ${hour} ${this.date} ${this.month.slice(0, 3).toUpperCase()} *`
				: `${minute} ${hour} * * ${this.day.slice(0, 3).toUpperCase()}`;
		}

		return null;
	}
};
