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
			name: 'add',
			description: 'Запланировать встречу',
			options: {
				name: {
					name: 'name',
					description: 'Введите название планируемой встречи',
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
	},
	typesMeet: { // ??
		once: 'Разовая встреча',
		repeated: 'Повторяющаяся встреча',
	},
};
