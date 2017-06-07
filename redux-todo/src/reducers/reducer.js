import { combineReducers } from 'redux';

import { ADD_TODO, TOGGLE_TODO, DEL_TODO, FILTER_TODO, Filters } from '../actions/action';


const { SHOW_ALL } = Filters;
const initialItems = [
  {text: 'default one', completed: true},
  {text: 'default two', completed: false},
  {text: 'item three', completed: true},
  {text: 'item four', completed: false},
  {text: 'item five', completed: true},
  {text: 'item six', completed: false}
]

function todos(state = initialItems, action) {
  switch (action.type) {
    case ADD_TODO:
      return [{text: action.text, completed: false}, ...state]

    case  TOGGLE_TODO:
      return state.map((item, index) => {
        if (index === action.index) {
          return Object.assign({}, item, {completed: !item.completed})
        }

        return item;
      })
    
    // 数组的filter方法， 会判断函数参数的返回值， 将返回值为true的对应item组成的新数组返回
    case DEL_TODO:
      return state.filter((item, index) => {
        return index !== action.index
      })

    default:
      return state;
  }
}

function filterTodo(state = SHOW_ALL, action) {
  switch (action.type) {
    case FILTER_TODO:
      return action.filter;
    
    default:
      return state;
  }
}

const todoApp = combineReducers({
  filter: filterTodo,
  todos: todos
})

export default todoApp
