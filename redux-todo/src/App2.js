import React, { Component } from 'react';
// import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import './App.css';

import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

import { addTodo, toggleTodo, filterTodo, delTodo, Filters } from './actions/action';

class App extends Component {
  // static propTypes = {
  //   todos: PropTypes.arrayOf(PropTypes.shape({
  //     text: PropTypes.string,
  //     completed: PropTypes.bool
  //   })),
  //   filter: PropTypes.oneOf([
  //     'SHOW_ALL',
  //     'SHOW_COMPLETED',
  //     'SHOW_ACTIVE'
  //   ])
  // }

  render() {

    console.log(this.props);

    // const { dispatch, todos, filter } = this.props;

    return (
      <div className="App">
        <AddTodo 
          onAddClick = {text => this.props.dispatch(addTodo(text))}
        />
        <TodoList 
          todos={this.props.todos}
          onTodoClick={index => this.props.dispatch(toggleTodo(index))}
          onDeleteClick={index => this.props.dispatch(delTodo(index))}
        />
        <Footer
          filter={this.props.filter}
          onFilterChange={filter => this._filter(filter)}
        />
      </div>
    );
  }

  _filter(filter) {
    this.props.dispatch(filterTodo(filter));
  }
}

// 过滤state.todos
function selectTodos(todos, filter) {
  switch (filter) {
    case Filters.SHOW_ALL:
      return todos;
    case Filters.SHOW_COMPLETED:
      return todos.filter(function(item) {
        return item.completed;
      })
    case Filters.SHOW_ACTIVE:
      return todos.filter(item => !item.completed);
    default:
      return todos;
  }
}

// 如果connect()方法的参数为函数， 那么每次状态变化， 都会执行该函数
  // 函数的返回值会被拷贝到组件的props中
function get(state) {
  return {
    todos: selectTodos(state.todos, state.filter),
    filter: state.filter
  }
}

// 通过connect()方法， 可以将Redux的状态树绑定到组件上， 并将dispatch()方法传入到组件的props中
export default connect(get)(App);
