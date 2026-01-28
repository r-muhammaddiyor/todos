import { stateChanger } from './app.js';
import { elCardTemplate, elEdtForm, elTodosContainer } from './html.js';
export function ui(todos) {
  if (!Array.isArray(todos)) return;

  elTodosContainer.innerHTML = '';

  todos.forEach((element) => {
    if (!element) return;

    const clone = elCardTemplate.content.cloneNode(true);

    clone.querySelector('.js-title').innerText = element.title || 'No title';

    clone.querySelector('.js-text').innerText = element.description || element.text || 'No text';

    clone.querySelector('.js-status').innerText = element.status || 'unknown';

    clone.firstElementChild.setAttribute("data-card-id",element.id);

    elTodosContainer.appendChild(clone);
  });

  document.querySelectorAll(".js-todo-card").forEach(el=>{
    el.addEventListener("click",(evt)=>{
      if(evt.target.classList.contains("js-edit")==true) {
      editToDo(evt.target.closest(".js-todo-card").getAttribute("data-card-id"));
      } else if(evt.target.classList.contains("js-delete")==true) {
      deleteToDo(evt.target.closest(".js-todo-card").getAttribute("data-card-id"));
      } 
    })

  })

};

function deleteToDo(id) {
  fetch("https://json-api.uz/api/project/muhammaddiyor-afandim/todos/"+id,{
    method:"DELETE"
  }).then(res=>res.text())
  .then(res=>{
    if(res=="deleted successfully") {
      alert("O'chirildi");
      deleteToDoAfterUI(id);
    } else {
      alert("O'chirilmadi. qayta urining");
    }
  }).catch(
    err=>{
      console.log(err);
      alert("O'chirilmadi. qayta urining");
    }
  )
};
 
function deleteToDoAfterUI(id) {
  let oldState = stateChanger("get"); 
  let newState = oldState.filter(el=>{
    if(el.id!=id) return true;
  });
  stateChanger(newState);
};

function editToDo(id) {
  fetch("https://json-api.uz/api/project/muhammaddiyor-afandim/todos/"+id)
  .then(res=>res.json())
  .then(res=>{
      editFormFiller(res)
  })
  
  elEdtForm.addEventListener("submit",(evt)=>{
    evt.preventDefault();
    let editData = new FormData(elEdtForm);
    let reqObj ={
      title: editData.get("title"),
      text: editData.get("text"),
      status: editData.get("status"),
    };
    fetch("https://json-api.uz/api/project/muhammaddiyor-afandim/todos/"+id,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      }, body: JSON.stringify(reqObj)
    }).then(res=>res.json())
    .then(res=>{
      editToDoAfterUI(res);
    });
  });
  
}

function editFormFiller(data) {
  editModal.showModal()
  elEdtForm.querySelector('[name="title"]').value=data.title?data.title:"No title";
  elEdtForm.querySelector('[name="text"]').value=data.text?data.text:"No text";
  elEdtForm.querySelector('[name="status"]').value=data.status?data.status:"pending";
}

function editToDoAfterUI(data) {
  editModal.close()  
  let oldState = stateChanger("get"); 
  let newState = oldState.map(el=>{
    if(el.id!=data.id) return el;
    else return data;
  });
  stateChanger(newState); 
};