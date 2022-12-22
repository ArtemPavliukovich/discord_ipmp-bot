module.exports = {
	idGeneralChannel: '1055125402009477154',
	welcomeRoles: ['Front-end'],
	commands: {
		hello: {
			name: 'hello',
			description: 'Поприветствовать IPMP-Bot',
			message: (username) => `Привет ${username}, меня зовут IPMP-Bot, рад знакомству!`,
		},
		addScheduleMeet: {
			name: 'add',
			description: 'Запланировать встречу',
		},
		removeScheduleMeet: {
			name: 'remove',
			description: 'Отменить встречу',
			options: {
				name: {
					name: 'name', // FIXME:
					description: 'Введите название встречи',
				},
			},
		},
	},
	commandsError: 'При выполнении этой команды произошла ошибка',
	typesMeet: {
		once: 'Разовая встреча',
		repeated: 'Повторяющаяся встреча',
	},
};
