const { addKv, getKv } = require('./peformance');
const { subscriber, getResult } = require('../lib/nats');

subscriber('worker.added');
subscriber('task.added');
subscriber('task.done');
subscriber('task.cancel');
/**
 * service to get total of workers
 */
async function totalWorkerService(req, res) {
  try {
    let worker = getResult();
    const workers = await addKv('worker.added', worker);
    res.setHeader('content-type', 'application/json');
    const message = JSON.stringify(workers);
    res.write(message);
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.end();
    return;
  }
}

/**
 * service to get total of tasks
 */
async function totalTaskService(req, res) {
  try {
    let task = getResult();
    const tasks = await addKv('task.added', task);
    res.setHeader('content-type', 'application/json');
    const message = JSON.stringify(tasks);
    res.write(message);
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.end();
    return;
  }
}

/**
 * service to get total of done tasks
 */
async function totalDoneService(req, res) {
  try {
    let taskDone = getResult();
    const taskDones = await addKv('task.done', taskDone);
    res.setHeader('content-type', 'application/json');
    const message = JSON.stringify(taskDones);
    res.write(message);
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.end();
    return;
  }
}

/**
 * service to get total of cancel tasks
 */
async function totalCancelService(req, res) {
  try {
    let taskCancel = getResult();
    const taskCancels = await addKv('task.done', taskCancel);
    res.setHeader('content-type', 'application/json');
    const message = JSON.stringify(taskCancels);
    res.write(message);
    res.end();
    res.end();
  } catch (err) {
    res.statusCode = 500;
    res.end();
    return;
  }
}

module.exports = {
  totalWorkerService,
  totalTaskService,
  totalDoneService,
  totalCancelService,
};
