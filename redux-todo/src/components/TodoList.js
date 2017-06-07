import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import Todo from './Todo';



export default class TodoList extends Component {
  static propTypes = {
    todos : PropTypes.array,
    onTodoClick : PropTypes.func,
    onDeleteClick : PropTypes.func
  }

  static defaultProps = {
    todos: []
  }

/*
  bind 将函数中的this绑定到第一个参数， 并返回一个新的函数
  call 将函数中的this绑定到第一个参数， 并执行函数

  map() 方法的第一个参数为一个函数， 第二个参数可以指定该函数内部的this
*/
  render() {
    return (
      <ul>
        {this.props.todos.map(function(item, index) {
          // console.log(this);
          return (
            <Todo 
              key={index}
              clickHandler={() => this.props.onTodoClick(index)}
              deleteHandler={() => this.props.onDeleteClick(index)}
              {...item}
            />
          )
        }, this)}
      </ul>
    )
  }
}
