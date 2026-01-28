import { elAddForm, elToast, elToastTemplate, elSuccessTemplate, elEdtForm } from './html.js';
import { loader } from './loader.js';
import { ui } from './ui.js';

let state = null;
let edited = null

function stateChanger(value) {
  state = value;
  ui(state);
}

loader(true);
fetch('https://json-api.uz/api/project/muhammaddiyor-afandim/todos')
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    console.log(res);
    stateChanger(res.data);
  })
  .catch((err) => {
    console.log('Xatolik bor ' + err);
  })
  .finally(() => {
    loader(false);
  });

function edits(data) {
  fetch('https://json-api.uz/api/project/muhammaddiyor-afandim/todos/' + data.id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      const result = state.map((el) => {
        if (el.id === res.id) {
          return res;
        } else {
          return el;
        }
      });
      stateChanger(result);
      editModal.close();
    })
    .catch((err) => {
      console.log('Xatolik bor ' + err);
    })
    .finally(() => {});
}

elForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(elForm);
  const result = { id: edited };
  formData.forEach((value, key) => {
    result[key] = value;
  });
  edits(result);
});

elTodosContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('js-edit')) {
    editModal.showModal();
    const data = state.find((el) => el.id == evt.target.id);

    elForm.status.value = data.status;
    elForm.title.value = data.title;
    elForm.text.value = data.text;
    edited = data.id;
  }
});
