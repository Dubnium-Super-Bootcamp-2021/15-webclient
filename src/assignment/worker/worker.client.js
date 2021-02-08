const { dispatch } = require('rxjs/internal/observable/pairs');
const { fetchTasksApi, addTaskApi, doneTaskApi, undoneTaskApi } = require('../service/assignment/worker/worker.service');
const {
  addAction,
  loadWorkersAction,
} = require('./store');