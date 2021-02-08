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
  loadTasksAction,
} = require('./store');

const getWorkerAsync = async (dispatch, getState) => {
  const workerAsync = await getWorkerApi();
  dispatch(loadTasksAction(workerAsync));
};

const getTaskAsync = async (dispatch, getState) => {
  const tasksAsync = await getTaskApi();
  dispatch(loadTasksAction(tasksAsync));
};

const loadTasksAsync = async (dispatch, getState) => {
  const tasksAsync = await fetchTasksApi();
  dispatch(loadTasksAction(tasksAsync));
};

const loadTasksAsync = async (dispatch, getState) => {
  const tasksAsync = await fetchTasksApi();
  dispatch(loadTasksAction(tasksAsync));
};

module.exports = {
  getWorkerAsync,
  getTaskAsync,
  doneTaskAsync,
  undoneTaskAsync,
};
