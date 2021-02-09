const { client } = require('./client');

async function getWorkerApi(task) {
  return await client.get('http://localhost:9999/logworker', { task });
}

async function getTaskApi() {
  return await client.get('http://localhost:9999/logtask');
}

async function getTaskDoneApi() {
  return await client.get(`http://localhost:9999/logdone`);
}

async function getTaskCancelApi() {
  return await client.get(`http://localhost:9999/logcancel`);
}

module.exports = {
  getWorkerApi,
  getTaskApi,
  getTaskDoneApi,
  getTaskCancelApi,
};
