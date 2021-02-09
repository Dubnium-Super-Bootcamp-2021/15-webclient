require('./app.css');
const { store$ } = require('./store');

const {
  getWorkerAsync,
  getTaskAsync,
  doneTaskAsync,
  undoneTaskAsync,
} = require('./peformance-client');

//DOM
const worker = document.getElementById('worker');
const task = document.getElementById('task');
const done = document.getElementById('done');
const cancel = document.getElementById('cancel');

// Presentation Layer
store$.subscribe(() => {
  const state = store$.getState();
  render(state);
});

store$.dispatch(getWorkerAsync);
store$.dispatch(getTaskAsync);
store$.dispatch(doneTaskAsync);
store$.dispatch(undoneTaskAsync);

function render(state) {
  worker.innerHTML = state.worker.created;
  task.innerHTML = state.task.created;
  done.innerHTML = state.task.done;
  cancel.innerHTML = state.task.cancel;
}