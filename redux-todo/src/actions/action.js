
export const ADD_TODO = 'ADD_TODO';

export const DEL_TODO = 'DEL_TODO';

export const TOGGLE_TODO = 'TOGGLE_TODO';

export const FILTER_TODO = 'FILTER_TODO';


export const Filters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}


export function addTodo(text) {
  return {
    type: ADD_TODO,
    text: text
  }
}

export function delTodo(index) {
  return {
    type: DEL_TODO,
    index: index
  }
}

export function toggleTodo(index) {
  return {
    type: TOGGLE_TODO,
    index: index
  }
}

export function filterTodo(filter) {
  return {
    type: FILTER_TODO,
    filter: filter
  }
}