import { elCardTemplate, elTodosContainer } from './html.js';
export function ui(todos) {
  if (!Array.isArray(todos)) return;

  elTodosContainer.innerHTML = '';

  todos.forEach((element) => {
    if (!element) return;

    const clone = elCardTemplate.content.cloneNode(true);

    clone.querySelector('.js-title').innerText = element.title || 'No title';

    clone.querySelector('.js-text').innerText = element.description || element.text || 'No text';

    clone.querySelector('.js-status').innerText = element.status || 'unknown';

    elTodosContainer.appendChild(clone);
  });
}
