import React, { Component } from 'react';
import { PropTypes } from 'prop-types';


export default class extends Component {
  static propTypes = {
    text : PropTypes.string,
    completed: PropTypes.bool,
    clickHandler: PropTypes.func,
    deleteHandler: PropTypes.func
  }


  render() {
    return (
      <li>
        <span
          style={{
            textDecoration: this.props.completed ? 'line-through' : 'none',
            cursor: this.props.completed ? 'default' : 'pointer'
          }}
          onClick={this.props.clickHandler}
        >
          {this.props.text}
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a 
          href=""
          onClick={this._deleteClick.bind(this)}
        >delete</a>
      </li>
    )
  }

  _deleteClick(e) {
    e.preventDefault();
    this.props.deleteHandler()
  }
}