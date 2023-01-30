const moment = require('moment-timezone');
const { v4: uuidv4 } = require('uuid');
const cron = require('node-cron');
const { timeZone, minutesForWarnAboutMeet, translateDays } = require('../../config');

module.exports = class Task {
	constructor(name, month, day, date, hour, minute, users) {
		this.id = uuidv4();
		this.name = name.trim();
		this.month = month?.trim() || null;
		this.date = +`${date}`?.trim() || null;
		this.day = day?.trim() || null;
		this.hour = +`${hour}`.trim();
		this.minute = +`${minute}`.trim();
		this.users = users.match(/<@\d+>/g);
		this.roles = users.match(/<@&\d+>|@here|@everyone/g);
	}

	getTaskSchedule(func) {
		const minute = this.minute >= minutesForWarnAboutMeet
			? this.minute - minutesForWarnAboutMeet
			: 60 + this.minute - minutesForWarnAboutMeet;

		const hour = 	this.minute >= minutesForWarnAboutMeet
			? this.hour
			: this.hour ? this.hour - 1 : 23;

		const time = this.month
			? `${minute} ${hour} ${this.date} ${this.month} *`
			: `${minute} ${hour} * * ${this.day}`;

		return cron.schedule(time, func, {
			scheduled: false,
			timezone: timeZone,
		});
	}

	getDate() {
		let result;
		const hour = `${this.hour}`.length === 1 ? `0${this.hour}` : this.hour;
		const minute = `${this.minute}`.length === 1 ? `0${this.minute}` : this.minute;
		const time = `${hour}:${minute}`;

		if (this.month) {
			const year = new Date().getFullYear();
			const date = new Date(`${this.month} ${this.date}, ${year} ${time}:00`);
			result = `${moment.tz(date, timeZone).locale('ru').format('LL')} в ${time}`;
		} else {
			result = `по ${translateDays[this.day]} в ${time}`;
		}

		return result;
	}

	checkDate() {
		
	}
};
