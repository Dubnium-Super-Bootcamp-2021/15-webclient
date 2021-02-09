const { dispatch } = require('rxjs/internal/observable/pairs');
const { fetchWorkersApi, addWorkerApi, deleteWorkerApi } = require('../api/worker-service');
const {
  addAction,
  loadWorkersAction,
  deleteWorkerAction,
} = require('./store');

const addWorkerAsync = (worker) => async (dispatch, getState) => {
  const workerData = await addWorkerApi(task);
  dispatch(addAction(workerData));
};

const loadWorkersAsync = async (dispatch, getState) => {
  const workersAsync = await fetchWorkersApi();
  dispatch(loadWorkersAction(workersAsync));
};

const deleteWorkerAsync = (id) => {
  return async (dispatch, getState) => {
    await deleteWorkerApi(id);
    dispatch(deleteWorkerAction(id));
  };
};

module.exports = {
  addWorkerAsync,
  loadWorkersAsync,
  deleteWorkerAsync,
};