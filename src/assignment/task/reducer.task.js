// setup state
const initialState = [
  {
    id: 1,
    job: 'percobaan',
    done: false,
    cancel: false,
    attachment: '',
    addedAt: '',
    assignee: '',
  },
];

// reduce function
function addTask(state, action) {
  state.push({
    id: action.payload.id,
    job: action.payload.job,
    done: action.payload.done,
    cancel: action.payload.cancel,
    attachment: action.payload.attachment,
    addedAt: action.payload.addedAt,
    assignee: action.payload.assignee,
  });
  return state;
}

function doneTask(state, action) {
  const task = state.find((t) => t.id === action.payload);
  task.done = true;
  return state;
}

function cancelTask(state, action) {
  const task = state.find((t) => t.id === action.payload);
  task.cancel = true;
  return state;
}

function loadTasks(state, action) {
  state = action.payload;
  return state;
}

module.exports = {
  initialState,
  addTask,
  doneTask,
  cancelTask,
  loadTasks,
};
