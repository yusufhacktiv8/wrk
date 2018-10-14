import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;

class SmwgTypeSelect extends Component {
  constructor(props) {
    super(props);

    const value = this.props.value;
    this.state = {
      value,
      months: [
        { id: 1, name: 'QMSL' },
        { id: 2, name: 'SHE Level' },
        { id: 3, name: '5R' },
      ],
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState({ value });
    }
  }

  handleChange = (value) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    this.triggerChange(value);
  }

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }

  render() {
    return (
      <Select
        placeholder="Type"
        onChange={this.handleChange}
        value={this.state.value}
        style={{ width: '100%' }}
      >
        {this.state.months.map(obj => (
          <Option key={obj.id} value={obj.id}>{obj.name}</Option>
        ))}
      </Select>
    );
  }
}

export default SmwgTypeSelect;
