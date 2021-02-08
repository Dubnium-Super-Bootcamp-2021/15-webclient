const {
    createAction,
    createReducer,
    configureStore,
  } = require('@reduxjs/toolkit');
const { initialState, add, loadWorkers } = require('./reducer');

const thunkMiddleware = require('redux-thunk');

const addAction = createAction('add');
const loadWorkersAction = createAction('loadWorkers');

const workerReducer = createReducer(initialState, {
    [addAction]: add,
    [loadWorkersAction]: loadTasks
});

const store$ = configureStore({
    reducer: todoReducer,
    middleware: [thunkMiddleware.default, loggingMiddleware, delayActionMiddleware]
});

module.exports = {
    store$,
    addAction,
    loadWorkersAction,
};