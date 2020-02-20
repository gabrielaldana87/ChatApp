import React, { Component } from 'react';

class Form extends Component {
  constructor (props) {
    super (props);
    this.state = {
      lines: []
    }
    ;
    this.handleChange = this.handleChange.bind(this);
  }
  ;
  handleChange = evt => {
    this.setState({ value: evt.target.value });
  }
  ;
  handleSubmit = evt => {
    this.props.handleSubmit( this.state.value );
    evt.preventDefault();
    this.inputFieldReset.value = '';
    this.setState({ value: '' });
  }
  ;
  render () {
    const { placeholder, handleSubmit } = this.props;
    return (
      <form>
        <label>
          { placeholder }
          <input
            type='text'
            ref={ el => this.inputFieldReset = el }
            onChange={ this.handleChange }
          />
        </label>
        <input
          type='submit'
          value='Submit'
          onClick={ this.handleSubmit }
        />
      </form>
    )
  }
}

export default Form;