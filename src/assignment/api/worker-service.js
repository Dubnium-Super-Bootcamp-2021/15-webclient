const { client } = require('./client');

async function fetchWorkersApi() {
  return await client.get('http://localhost:9999/getallworker');
}

async function addWorkerApi(worker) {
  return await client.post('http://localhost:9999/addworker', { worker });
}

async function deleteWorkerApi(id) {
  return await client.put(`http://localhost:9999/del?id=${id}`);
}


module.exports = {
  fetchWorkersApi,
  addWorkerApi,
  deleteWorkerApi,
};