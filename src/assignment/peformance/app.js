require('./app.css');
const { store$ } = require('./store');

// const {
//   addTaskAsync,
//   loadTasksAsync,
//   doneTaskAsync,
//   undoneTaskAsync,
// } = require('./todo-client');

//DOM
const worker = document.getElementById('worker');
const count = document.getElementById('count');
const task = document.getElementById('task');
const done = document.getElementById('done');
const cancel = document.getElementById('cancel');

// Presentation Layer
store$.subscribe(() => {
  const state = store$.getState();
  render(state);
});
const state = store$.getState();
render(state);

// store$.dispatch(loadTasksAsync);

function render(state) {
  list.innerHTML = '';
  for (let i = 0; i < state.length; i++) {
    const todo = state[i];
    const li = document.createElement('li');
    li.textContent = todo.task;
    if (todo.done) {
      li.className = 'todo-done';
      li.onclick = function () {
        // dispatch action done
        store$.dispatch(undoneTaskAsync(todo.id));
      };
    } else {
      li.className = '';
      li.onclick = function () {
        // dispatch action done
        store$.dispatch(doneTaskAsync(todo.id));
      };
    }
    list.append(li);
  }
}