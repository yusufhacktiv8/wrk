import React, { Component } from 'react';
import { Select } from 'antd';

const Option = Select.Option;
const MIN_YEAR = 2015;

class YearSelect extends Component {
  constructor(props) {
    super(props);

    const value = this.props.value;
    const currentYear = (new Date()).getFullYear();
    const years = [];
    for (let i = MIN_YEAR; i <= currentYear; i += 1) {
      years.push(i);
    }
    this.state = {
      value,
      years,
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
        placeholder="Year"
        onChange={this.handleChange}
        value={this.state.value}
        style={{ width: '100%' }}
      >
        {this.state.years.map(obj => (
          <Option value={obj}>{obj}</Option>
        ))}
      </Select>
    );
  }
}

export default YearSelect;
