const {
    createAction,
    createReducer,
    configureStore,
  } = require('@reduxjs/toolkit');
const { initialState, add, loadWorkers, deleteWorker } = require('./reducer');
//const { loggingMiddleware} = require('./worker.middleware');
const thunkMiddleware = require('redux-thunk');

const addAction = createAction('add');
const loadWorkersAction = createAction('loadWorkers');
const deleteWorkersAction = createAction('deleteWorker');

const workerReducer = createReducer(initialState, {
    [addAction]: add,
    [loadWorkersAction]: loadWorkers,
    [deleteWorkersAction]: deleteWorker
});

const store$ = configureStore({
    reducer: workerReducer,
    middleware: [thunkMiddleware.default]
});

module.exports = {
    store$,
    addAction,
    loadWorkersAction,
    deleteWorkersAction,
};