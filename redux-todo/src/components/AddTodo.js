import React , { Component } from 'react';
import { PropTypes } from 'prop-types';
import { findDOMNode } from 'react-dom';



export default class extends Component  {
  static propTypes = {
    onAddClick : PropTypes.func
  }

  render() {
    return (
      <div>
        <input type='text' ref='input-box' />
        <button onClick={() => this._handler()} >add</button>
      </div>
    )
  }

  _handler() {
    const node = findDOMNode(this.refs['input-box']);
    const text = node.value.trim();
    this.props.onAddClick(text);
    node.value = '';
  }
}
