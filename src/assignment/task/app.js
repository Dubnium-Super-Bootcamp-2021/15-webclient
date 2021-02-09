require('./app.css');

const {
  loadTasksAsync,
  addTaskAsync,
  cancelTasksAsync,
  doneTasksAsync,
} = require('./task.client');

const { storeTask$ } = require('./store.task');

const { loadWorkerAsync } = require('../worker/worker.client');

const { storeWorker$ } = require('../worker/store.worker');

const job = document.getElementById('job');
let assignee = document.getElementById('assignee');
const attachment = document.getElementById('attachment');
const formulir = document.getElementById('task-form');
const daftarTask = document.querySelector('#daftarTask');
const listButton = document.getElementsByTagName('button');

formulir.onsubmit = (e) => {
  e.preventDefault();
  if (!job || !assignee || !attachment) {
    return;
  }
  const task = {
    job: job.nodeValue,
    assignee: assignee.nodeValue,
    attachment: attachment.nodeValue,
  };
  storeTask$.dispatch(addTaskAsync(task));
  job.nodeValue = '';
  assignee.nodeValue = '';
  attachment.nodeValue = '';
};
storeTask$.subscribe(() => {
  const stateTask = storeTask$.getState();
  // const stateWorker = storeWorker$.getState();
  render(stateTask);
});
const stateTask = storeTask$.getState();
// const stateWorker = storeWorker$.getState();
render(stateTask);
storeTask$.dispatch(loadTasksAsync);
// storeWorker$.dispatch(loadWorkerAsync);

function render(stateTask) {
  daftarTask.innerHTML = '';
  // for (let j = 0; j < stateWorker.length; j++) {
  //   assignee += `<option value="${stateWorker[j].id}">${stateWorker[j].name}</option>`;
  // }
  for (let i = 0; i < stateTask.length; i++) {
    const task = stateTask[i];
    const p = document.createElement('p');
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');

    p.innerText = task.job;
    span1.innerText = ' done :' + task.done;
    span2.innerText = ' cancel :' + task.cancel;

    span1.onclick = () => {
      storeTask$.dispatch(doneTasksAsync(task.id));
      span1.className = 'done-task';
    };

    span2.onclick = () => {
      storeTask$.dispatch(cancelTasksAsync(task.id));
      span2.className = 'cancel-task';
    };

    daftarTask.append(p);
    p.append(span1);
    p.append(span2);
  }
}
