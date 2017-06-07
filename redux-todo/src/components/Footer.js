import React, { Component } from 'react';
import { PropTypes } from 'prop-types';


export default class extends Component {
  static propTypes = {
    filter: PropTypes.oneOf(
      [
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
      ]
    ),
    onFilterChange: PropTypes.func
  }


  render() {
    // console.log(this.props.filter);
    return (
      <p>
        <strong>Show: </strong>
        {this._renderFilter('SHOW_ALL', 'ALL')}
        {', '}
        {this._renderFilter('SHOW_COMPLETED', 'COMPLETED')}
        {', '}
        {this._renderFilter('SHOW_ACTIVE', 'ACTIVE')}
      </p>
    )
  }

  _renderFilter(filter, name) {
    if (filter === this.props.filter) {
      return (
        <span>{name}</span>
      );
    }

    return (
      <a 
        href=''
        onClick={(e) => {
          e.preventDefault();
          this.props.onFilterChange(filter);
        }}
      >
        {name}
      </a>
    )
  }


}