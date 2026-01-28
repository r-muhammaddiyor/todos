import { elAddForm, elToast, elToastTemplate, elSuccessTemplate, elEdtForm } from './html.js';
import { loader } from './loader.js';
import { ui } from './ui.js';

let state = null;

loader(true);
fetch('https://json-api.uz/api/project/muhammaddiyor-afandim/todos')
.then((res) => {
  return res.json();
})
.then((res) => {
  state=res.data;
  stateChanger(res.data);
})
.catch((err) => {
    console.log('Xatolik bor ' + err);
  })
  .finally(() => {
    loader(false);

  });
  
function stateChanger(value) {
  if(value!="get") {
  state = value;
  ui(state);
  } else {
    return state;
  }
  
}


export {
  stateChanger
}