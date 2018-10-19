import React, { Component } from 'react';

class SelectComponent extends Component {
  constructor(props) {
    super(props);

    const selectedValue = this.props.list.filter(item => item.selected);
    this.state = {
      selectedValue: (selectedValue && selectedValue.length > 0 && selectedValue[0].value) || this.props.list[0].value
    }
  }

  render () {
    const {selectedValue} = this.state;
    const {list, onChange} = this.props;

    return (
      <select value={selectedValue} onChange={onChange} className={this.props.className}>
        {
          list.map(item => {
            return <option value={item.value} key={item.value}>{item.text}</option>
          })
        }
      </select>
    );
  }
}

export default SelectComponent;
