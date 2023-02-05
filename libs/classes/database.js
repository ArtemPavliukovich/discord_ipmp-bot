const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, get, child } = require('firebase/database');
const { apiKeyFirebase, databaseURL } = process.env;
const Task = require('./task');

const firebaseConfig = {
  apiKey: apiKeyFirebase,
  databaseURL: databaseURL,
  authDomain: 'skm-bot-discord.firebaseapp.com',
  projectId: 'skm-bot-discord',
  storageBucket: 'skm-bot-discord.appspot.com',
  messagingSenderId: '904630518388',
  appId: '1:904630518388:web:b773916daa66683c8e0721',
};

class Database {
  constructor() {
    this.tasks = new Map();
    this.db = getDatabase(initializeApp(firebaseConfig));
  }

  getTasks() {
    return this.tasks;
  }

  async init() {
    const dbRef = ref(this.db);
    try {
      const data = await get(child(dbRef, 'tasks'));

      if (data.exists()) {
        Object.values(data.val()).forEach(elem => {
          const task = new Task(
            elem.id,
            elem.name,
            elem.month,
            elem.day,
            elem.date,
            elem.hour,
            elem.minute,
            elem.users,
            elem.channelId,
            elem.guildId,
            elem.year,
          );
          task.start();
          this.tasks.set(task.id, task);
        });
      }
    } catch (error) { /* empty */ }
  }

  async addTask(task) {
    try {
      await set(ref(this.db, `tasks/${task.id}`), {
        id: task.id,
        name: task.name,
        month: task.month,
        day: task.day,
        date: task.date,
        hour: task.hour,
        minute: task.minute,
        users: task.users,
        channelId: task.channelId,
        guildId: task.guildId,
        year: task.year,
      });
      task.start();
      this.tasks.set(task.id, task);
      return true;
    } catch (error) {
      return false;
    }
  }

  async removeTask(id) {
    try {
      await set(ref(this.db, `tasks/${id}`), null);
      const task = this.tasks.get(id);
      task.stop();
      this.tasks.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}

const database = new Database();

database.init();

module.exports = { database };
