require('./app.css');
const { store$ } = require('./store');
const {
    addWorkerAsync,
    loadWorkersAsync,
    deleteWorkerAsync,
} = require('./worker.client');

const form = document.getElementById('worker-form');
const kepala = document.getElementById('kepala');
const table = document.getElementById('table-worker');

// form.onsubmit = (event) => {
//     event.preventDefault();
//     const task = input.value;
//     if (!task?.length) {
//       return;
//     }
//     // dispatch action add
//     store$.dispatch(addTaskAsync(task));
//     input.value = '';
// };

store$.subscribe(() => {
    const state = store$.getState();
    render(state);
  });
const state = store$.getState();
render(state);

store$.dispatch(loadWorkersAsync);

function render(state) {
    table.innerHTML = '';

    for (let i = 0; i < state.length; i++) {
      const worker = state[i];
      console.log(worker);
      const raw = document.createElement('tr');
      const no = document.createElement('td');
      const name = document.createElement('td');
      const email = document.createElement('td');
      const address = document.createElement('td');
      const biografi = document.createElement('td');
      const nohp = document.createElement('td');
      const photo = document.createElement('td');
      const x = document.createElement("IMG");
      const hapus = document.createElement('td');
      const btnhapus = document.createElement('button');

      no.innerHTML = "";
      name.textContent = worker.name;
      email.textContent = worker.email;
      address.textContent = worker.address;
      biografi.textContent = worker.bio;
      nohp.textContent = worker.nohp;
      btnhapus.textContent = "hapus";
      btnhapus.className = 'btnhapus';
      x.append(worker.photo);
      photo.append(x);
      hapus.append(btnhapus);

      btnhapus.onclick = function () {
        store$.dispatch(deleteWorkerAsync(worker.id));
      }


      table.append(raw);
      raw.append(no);
      raw.append(name);
      raw.append(email);
      raw.append(address);
      raw.append(biografi);
      raw.append(nohp);
      raw.append(photo);
      raw.append(hapus);
    }
}