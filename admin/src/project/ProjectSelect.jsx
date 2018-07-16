import React, { Component } from 'react';
import { Select } from 'antd';
import axios from 'axios';
import showError from '../utils/ShowError';

const Option = Select.Option;
const PROJECTS_URL = `${process.env.REACT_APP_SERVER_URL}/api/projects`;

class ProjectSelect extends Component {
  constructor(props) {
    super(props);

    const value = this.props.value;
    this.state = {
      value,
      projects: [],
    };
  }

  componentDidMount() {
    this.fetchProjects();
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState({ value });
    }
  }

  fetchProjects() {
    axios.get(PROJECTS_URL, { params: {
      searchText: '',
      start: 0,
      count: 100,
    } })
      .then((response) => {
        this.setState({
          projects: response.data.rows,
        });
      })
      .catch((error) => {
        showError(error);
      });
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
        placeholder="Select Project"
        onChange={this.handleChange}
        value={this.state.value}
      >
        {this.state.projects.map(project => (
          <Option key={project.id} value={project.id}>{project.name}</Option>
        ))}
      </Select>
    );
  }
}

export default ProjectSelect;
