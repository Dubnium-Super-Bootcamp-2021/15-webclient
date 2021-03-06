// Setup state
const initialState = [
  { type: 'worker'},
  { type: 'task', done: false, cancel: false },
  { type: 'task', done: true, cancel: false },
];

// Reduce function
function worker(state, action){
  state.push({ type: action.payload.type });
  return state;
}

function task(state, action) {
  state.push({ type: action.payload.type, done: false, cancel: false });
  return state;
}

function done(state, action) {
  state.push({ type: action.payload.type, done: true });
  return state;
}

function cancel(state, action) {
  state.push({ type: action.payload.type, cancel: true });
  return state;
}

function loadTasks(state, action) {
  state = action.payload;
  return state;
}

module.exports = {
  initialState,
  worker,
  task,
  done,
  cancel,
  loadTasks,
};