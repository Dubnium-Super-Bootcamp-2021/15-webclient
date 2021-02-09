const { client } = require('./client');

async function getAllTaskApi() {
  return await client.get('http://localhost:9999/getalltask');
}
async function addTaskApi(task) {
  return await client.post('http://localhost:9999/task', { task });
}
async function updateTaskApi(id) {
  return await client.put(`http://localhost:9999/updatetask?id=${id}`);
}
async function cancelTaskApi(id) {
  return await client.put(`http://localhost:9999/canceltask?id=${id}`);
}

module.exports = {
  getAllTaskApi,
  addTaskApi,
  updateTaskApi,
  cancelTaskApi,
};
