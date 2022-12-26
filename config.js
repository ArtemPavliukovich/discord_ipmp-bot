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
				type: {
					name: 'type',
					description: 'Выберите тип встречи',
				},
			},
		},
		removeScheduleMeet: {
			name: 'remove',
			description: 'Отменить встречу',
			options: {
				name: {
					name: 'name',
					description: 'Выберите название отменяемой встречи',
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

	meets: {
		types: {
			once: {
				name: 'a one-time meeting',
				value: 'once',
			},
			repeated: {
				name: 'a recurring meeting',
				value: 'repeated',
			},
		},
		days: {
			monday: 'Monday',

		},
	},
};
