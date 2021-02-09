const { dispatch } = require('rxjs/internal/observable/pairs');
const {
  getWorkerApi,
  getTaskApi,
  getTaskDoneApi,
  getTaskCancelApi,
} = require('../api/todo-service');
const {
  store$,
  workerAction,
  taskAction,
  loadDoneAction,
  loadCancelAction,
  loadTasksAction,
} = require('./store');

const getWorkerAsync = async (dispatch, getState) => {
  const workerAsync = await getWorkerApi();
  dispatch(workerAction(workerAsync));
};

const getTaskAsync = async (dispatch, getState) => {
  const tasksAsync = await getTaskApi();
  dispatch(taskAction(tasksAsync));
};

const doneTaskAsync = async (dispatch, getState) => {
  const tasksAsync = await getTaskDoneApi();
  dispatch(loadDoneAction(tasksAsync));
};

const undoneTaskAsync = async (dispatch, getState) => {
  const tasksAsync = await getTaskCancelApi();
  dispatch(loadCancelAction(tasksAsync));
};

module.exports = {
  getWorkerAsync,
  getTaskAsync,
  doneTaskAsync,
  undoneTaskAsync,
};
