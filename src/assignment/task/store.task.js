const {
  createAction,
  createReducer,
  configureStore,
} = require('@reduxjs/toolkit');
const thunkMiddleware = require('redux-thunk');

const {
  initialState,
  addTask,
  doneTask,
  cancelTask,
  loadTasks,
} = require('./reducer.task');

const addTaskAction = createAction('addTask');
const doneTaskAction = createAction('doneTask');
const cancelTaskAction = createAction('cancelTask');
const loadTasksAction = createAction('loadTasks');

const taskReducer = createReducer(initialState, {
  [addTaskAction]: addTask,
  [doneTaskAction]: doneTask,
  [cancelTaskAction]: cancelTask,
  [loadTasksAction]: loadTasks,
});

const storeTask$ = configureStore({
  reducer: taskReducer,
  middleware: [thunkMiddleware.default],
});

module.exports = {
  storeTask$,
  addTaskAction,
  doneTaskAction,
  cancelTaskAction,
  loadTasksAction,
};
