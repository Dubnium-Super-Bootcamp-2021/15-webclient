const { client } = require('./client')

async function getAllTaskApi() {
    return await client.get('http://localhost:9999/getalltask');
}
async function addTaskApi() {
    return await client.post('http://localhost:9999/task');
}
async function updateTaskApi() {
    return await client.put('http://localhost:9999/updatetask');
}
async function cancelTaskApi() {
    return await client.put('http://localhost:9999/canceltask');
}

module.exports = {
    getAllTaskApi,
    addTaskApi,
    updateTaskApi,
    cancelTaskApi
}