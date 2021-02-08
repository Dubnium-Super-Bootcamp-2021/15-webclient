const {
  createAction,
  createReducer,
  configureStore,
} = require('@reduxjs/toolkit');
const { initialState, worker, task, loadTasks } = require('./reducer');
// const { loggingMiddleware, delayActionMiddleware, asyncMiddleware } = require('./middleware');
const thunkMiddleware = require('redux-thunk');

const workerAction = createAction('worker');
const taskAction = createAction('task');
const loadTasksAction = createAction('loadTasks');

const peformanceReducer = createReducer(initialState, {
  [workerAction]: worker,
  [taskAction]: task,
  [loadTasksAction]: loadTasks
});

const store$ = configureStore({
  reducer: peformanceReducer,
  middleware: [thunkMiddleware.default],
});

module.exports = {
  store$,
  workerAction,
  taskAction,
  loadTasksAction,
};