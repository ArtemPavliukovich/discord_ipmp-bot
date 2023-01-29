module.exports = class Task {
	constructor(name, month, day, date, hour, minute, users) {
		this.name = name;
		this.month = month || null;
		this.date = date || null;
		this.isRepeatedMeet = !month; // ?
		this.hour = hour;
		this.minute = minute;
		this.users = users.match(/<@\d+>/g);
		this.roles = users.match(/<@&\d+>|@here|@everyone/g);
		this.day = day ? 'in develop' : null;
	}

	setTaskSchedule() {
    console.log('in develope');
	}
};
