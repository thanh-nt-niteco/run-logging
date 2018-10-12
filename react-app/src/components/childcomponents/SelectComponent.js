import React, { Component } from 'react';

class SelectComponent extends Component {
  render () {
    const {list, selectedValue, onChange} = this.props;
    return (
      <select value={selectedValue} onChange={onChange}>
        {
          list.map(item => {
            return <option value={item.value}>{item.text}</option>
          })
        }
      </select>
    );
  }
}

export default SelectComponent;
