module.exports = {
	idGeneralChannel: '1055125402009477154',

	welcomeRoles: ['Front-end'],

	commands: {
		hello: {
			name: 'hello',
			description: 'Поприветствовать IPMP-Bot',
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
				name: {
					name: 'name',
					description: 'Введите название отменяемой встречи',
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
		hello: (username) => `Привет ${username}, меня зовут IPMP-Bot, рад знакомству!`,
		congratTeam: (idRole) => `Команду <@&${idRole}> 🙂 поздравляю с пополнением!`,
		addUser: (idUser) => `<@${idUser}> приветствую! У нас тут песочница, но всё по-взрослому, вливайся!`,
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
};
