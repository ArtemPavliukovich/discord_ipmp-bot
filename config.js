module.exports = {
	idGeneralChannel: '1055125402009477154',

	welcomeRoles: ['Front-end'],

	minutesForWarnAboutMeet: 15,

	timeZone: 'Europe/Minsk',

	commands: {
		hello: {
			name: 'hello',
			description: 'Поприветствовать SKM-Bot',
		},
		meets: {
			name: 'meets',
			description: 'Список запланированных встреч',
		},
		addScheduleMeet: {
			name: 'planning',
			description: 'Запланировать встречу',
			options: {
				name: {
					name: 'name',
					description: 'Введите название планируемой встречи',
				},
				month: {
					name: 'month',
					description: 'Выберите месяц',
				},
				date: {
					name: 'date',
					description: 'Укажите дату',
				},
				day: {
					name: 'day',
					description: 'Выберите день в который планируется встреча',
				},
				hour: {
					name: 'hour',
					description: 'Укажите в котором часу планируется встреча',
				},
				minute: {
					name: 'minute',
					description: 'Укажите минуту на которой планируется встреча',
				},
				users: {
					name: 'users',
					description: 'Отметьте людей которые должны присутствовать на встрече',
				},
			},
			subcommand: {
				onceMeet: {
					name: 'once-meet',
					description: 'Запланировать разовую встречу',
				},
				repeatMeet: {
					name: 'repeat-meet',
					description: 'Запланировать повторяющуюся встречу',
				},
			},
		},
		removeScheduleMeet: {
			name: 'remove',
			description: 'Отменить встречу',
			options: {
				id: {
					name: 'id',
					description: 'Введите ID отменяемой встречи',
				},
			},
		},
	},

	messages: {
		commandsError: 'При выполнении этой команды произошла ошибка',
		addSchedule: 'Встреча успешно запланирована',
		removeSchedule: 'Встреча успешно отменена',
		notMeets: 'Нет запланированных встреч',
		notExistMeet: 'Такой встречи не существует',
		notDate: 'В выбранном месяце, указанной даты не существует',
		hello: (username) => `Привет ${username}, меня зовут SKM-Bot, рад знакомству!`,
		congratTeam: (idRole) => `Команду <@&${idRole}> 🙂 поздравляю с пополнением!`,
		addUser: (userId) => `<@${userId}> приветствую! У нас тут песочница, но всё по-взрослому, вливайся!`,
		infoAboutTask: (name, date, taskId) => `${name}, ${date}, ID: ${taskId}`,
		userMessage: (userId, nameMeet, time) =>
			`Привет <@${userId}>, напоминаю, у тебя запланирована встреча "${nameMeet}" в ${time}, не опаздывай!`,
		channelMessage: (name, users, roles, time) => {
			const usersList = users ? ' ' + users.join(' ') : '';
			const rolesList = roles ? ' ' + roles.join(' ') : '';
			return `Напоминаю, у${usersList}${rolesList} состоится встреча "${name}" в ${time}.`;
		},
		plannedMeet: (userId, name, users, roles, date) => {
			const usersList = users ? ' ' + users.join(' ') : '';
			const rolesList = roles ? ' ' + roles.join(' ') : '';
			return `<@${userId}> запланировал(а) встречу "${name}", для${usersList}${rolesList}, дата: ${date}.`;
		},
	},

	days: {
		monday: 'Monday',
		tuesday: 'Tuesday',
		wednesday: 'Wednesday',
		thursday: 'Thursday',
		friday: 'Friday',
		saturday: 'Saturday',
		sunday: 'Sunday',
	},

	translateDays: {
		monday: 'Понедельникам',
		tuesday: 'Вторникам',
		wednesday: 'Средам',
		thursday: 'Четвергам',
		friday: 'Пятницам',
		saturday: 'Субботам',
		sunday: 'Воскресеньям',
	},

	months: {
		january: 'January',
		february: 'February',
		march: 'March',
		april: 'April',
		may: 'May',
		june: 'June',
		july: 'July',
		august: 'August',
		september: 'September',
		october: 'October',
		november: 'November',
		december: 'December',
	},

	translateMonths: {
		january: 'Января',
		february: 'Февраля',
		march: 'Марта',
		april: 'Апреля',
		may: 'Мая',
		june: 'Июня',
		july: 'Июля',
		august: 'Августа',
		september: 'Сентября',
		october: 'Октября',
		november: 'Ноября',
		december: 'Декабря',
	},
};
