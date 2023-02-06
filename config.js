module.exports = {
	idGeneralChannel: '1002123388942307394',

	welcomeRoles: [
		'Front-end',
		'Back-end',
		'QA',
		'BA',
		'PM',
		'Design',
		'DevOps',
		'Front-end-reviewer',
		'Back-end-reviewer',
	],

	channelForMessagesAboutMeeting: '1011626358729887775',

	minutesForWarnAboutMeet: 15,

	timezone: 'Europe/Minsk',

	commands: {
		hello: {
			name: 'hello',
			description: 'Поприветствовать SKM-Bot',
		},
		help: {
			name: 'help',
			description: 'Описание команд SKM-Bot',
		},
		stands: {
			name: 'stands',
			description: 'Список стендов',
		},
		tools: {
			name: 'tools',
			description: 'Список инструментов',
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

	commandsInfo: [
		'/help - описание команд SKM-bot',
		'/hello - поприветствовать SKM-bot',
		'/meets - посмотреть список всех запланированных встреч и их ID',
		'/planning once-meet - запланировать разовую встречу',
		'/planning repeat-meet - запланировать повторяющуюся встречу',
		'/remove - удалить встречу, необходимо указать её ID',
		'/stands - посмотреть список, доступных на проекте, стендов',
		'/tools - посмотреть список инструментов',
	],

	stands: [
		{
			name: 'Test',
			link: 'http://192.168.1.182:3000/SkillMatrix',
			decscription: 'стенд для функционального тестирования и активной разработки',
		},
		{
			name: 'Pre-prod',
			link: 'http://192.168.1.188:3000/SkillMatrix',
			decscription: 'стабильная версия приложения',
		},
	],

	tools: [
		{
			name: 'Miro',
			link: 'https://miro.com/app/board/uXjVOnF8zsM=/',
		},
		{
			name: 'Confluence',
			link: 'https://confluence.senlainc.com/pages/viewpage.action?pageId=66093406',
		},
		{
			name: 'Gitlab',
			link: 'https://git.senla.eu/office-apps',
		},
		{
			name: 'JIRA',
			link: 'https://jira.senlainc.com/projects/PROJOFAPPS/issues',
		},
		{
			name: 'Figma',
			link: 'https://www.figma.com/file/Drln89Zgfs5w7AfJkvnrXl/SkillApp?node-id=18%3A11',
		},
	],

	messages: {
		commandsError: 'При выполнении этой команды произошла ошибка.',
		addSchedule: 'Встреча успешно запланирована.',
		removeSchedule: 'Встреча успешно отменена.',
		notMeets: 'Нет запланированных встреч.',
		notExistMeet: 'Такой встречи не существует.',
		notDate: 'В выбранном месяце, указанной даты не существует.',
		errorAdd: 'При попытке создания встречи произошла ошибка, повторите запрос.',
		errorRemove: 'При попытке удаления встречи произошла ошибка, повторите запрос.',
		errorOnceMeet: 'При планировании разовой встречи произошла ошибка, время до начала встречи' +
			' должно быть не менее 15 минут и дата встречи ограничивается текущим годом',
		hello: (username) => `Привет ${username}, меня зовут SKM-Bot, рад знакомству!`,
		congratTeam: (idRole) => `Команду <@&${idRole}> 🙂 поздравляю с пополнением!`,
		addUser: (userId) => `<@${userId}> приветствую! У нас тут песочница, но всё по-взрослому, вливайся!`,
		infoAboutTask: (nameMeet, date, taskId) => `${nameMeet}, ${date}, ID: ${taskId}`,
		channelMessage: (nameMeet, users, time) =>
			`Напоминаю, у ${users.join(' ')} состоится встреча "${nameMeet}" в ${time}.`,
		userMessage: (userId, nameMeet, time) =>
			`Привет <@${userId}>, напоминаю, сегодня у тебя запланирована встреча "${nameMeet}" в ${time}, не опаздывай!`,
		plannedMeet: (userId, nameMeet, users, date) =>
			`<@${userId}> запланировал(а) встречу "${nameMeet}", для ${users.join(' ')}, дата: ${date}.`,
		removeMeet: (userId, nameMeet, date) =>
			`<@${userId}> отменил(а) встречу "${nameMeet}", запланированную ${date}.`,
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
