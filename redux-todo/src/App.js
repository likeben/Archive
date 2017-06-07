import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './App.css';

import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

// import { addTodo, toggleTodo, filterTodo, delTodo, Filters } from './actions/action';
import { Filters } from './actions/action';

// 将action模块的所有接口组合成actions对象，在当前模块中使用
import * as actions from './actions/action';

class App extends Component {

  render() {

    console.log(this.props);

    // const { actions, todos, filter } = this.props;

    return (
      <div className="App">
        <AddTodo 
          onAddClick = {text => this.props.actions.addTodo(text)}
        />
        <TodoList 
          todos={this.props.todos}
          onTodoClick={index => this.props.actions.toggleTodo(index)}
          onDeleteClick={index => this.props.actions.delTodo(index)}
        />
        <Footer
          filter={this.props.filter}
          onFilterChange={filter => this._filter(filter)}
        />
      </div>
    );
  }

  _filter(filter) {
    this.props.actions.filterTodo(filter);
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
/*function get(state) {
  return {
    todos: selectTodos(state.todos, state.filter),
    filter: state.filter
  }
}*/

// 将Redux状态映射到组件的props中
function mapStateToProps(state) {
  return {
    todos: selectTodos(state.todos, state.filter),
    filter: state.filter
  }
}

// 将Redux的actions映射到组件的props
  // 通过bindActionCreators()将actions绑定到dispatch， 使用时直接调用函数， 不需要再显式地派发
function mapDispatchToProps(dispatch) {
  return {actions : bindActionCreators(actions, dispatch)}
}

// 通过connect()方法， 可以将Redux的状态树绑定到组件上， 并将dispatch()方法传入到组件的props中
export default connect(mapStateToProps, mapDispatchToProps)(App);
