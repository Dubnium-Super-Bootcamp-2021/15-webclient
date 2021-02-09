const { getConnection } = require('typeorm');
const { Task } = require('./task.model');

const ERROR_REGISTER_TASK_INVALID = 'data inputan tidak lengkap';
const ERROR_TASK_NOT_FOUND = 'task tidak ditemukan';

/**
 * register new task
 */
async function registerTask(data) {
  if (!data.job || !data.attachment || !data.assignee) {
    throw ERROR_REGISTER_TASK_INVALID;
  }
  const TaskRepo = getConnection().getRepository('Task');
  const task = new Task(
    null,
    data.job,
    '',
    '',
    data.attachment,
    '',
    data.assignee
  );
  await TaskRepo.save(task);
  return task;
}

/**
 * get list of task
 */
function listTask() {
  const taskRepo = getConnection().getRepository('Task');
  return taskRepo.find();
}

/**
 * done a task by an id
 */
async function doneTask(id) {
  const con = getConnection();
  // const task = con.getRepository('Task');
  // if (!task) {
  //   throw ERROR_TASK_NOT_FOUND;
  // }
  const taskRepo = await con
    .createQueryBuilder()
    .update(Task)
    .set({ done: true })
    .where('id = :id', { id: id })
    .execute();
  return taskRepo;
}
async function cancelTask(id) {
  const con = getConnection();
  // const task = await taskRepo.findOne(id);
  // if (!task) {
  //   throw ERROR_TASK_NOT_FOUND;
  // }
  const taskRepo = await con
    .createQueryBuilder()
    .update(Task)
    .set({ cancel: true })
    .where('id = :id', { id: id })
    .execute();
  return taskRepo;
}

module.exports = {
  registerTask,
  doneTask,
  cancelTask,
  listTask,
  ERROR_REGISTER_TASK_INVALID,
  ERROR_TASK_NOT_FOUND,
};
