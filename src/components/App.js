import React , { Component }from 'react';
import Form from './Form/Form';
import Bubble from './Bubbles/Bubble';
const ws = new WebSocket(`ws://localhost:4000`);

class App extends Component {
  constructor (props) {
    super (props);
    this.state = {
      user: null,
      lines: [],
      initialMessage: null
    }
  }
   componentDidMount () {
    ws.onmessage = evt => {
      const parsedMsg = JSON.parse( evt.data );
      this.setState( { initialMessage: parsedMsg });
      this.setState( { lines: this.state.lines.concat( parsedMsg ) });
    };
  }
  ;
  handleNameSubmit = evt => {

    ws.send( JSON.stringify({
      type: 'message',
      user: evt,
      date: Date.now()
    }));

  }
  ;
  handleMessageSubmit = evt => {

    ws.send( JSON.stringify({
      type: 'message',
      text: evt,
      date: Date.now()
    }));

  }
  ;
  componentDidUpdate (prevProps, prevState) {

    // if (prevState.lines.length !== this.state.lines.length ) {
      ws.onmessage = evt => {
        const parsedMsg = JSON.parse( evt.data );
        parsedMsg.user ? this.setState( { user: parsedMsg.user } ) : null;
        this.setState( { lines: this.state.lines.concat( parsedMsg ) });
      };
    // }
  }
  ;
  render () {
    const { user , lines } = this.state;
    return (
      <>
        <Form
          placeholder='Enter your Name'
          ws={ ws }
          handleSubmit={ this.handleNameSubmit }
        />
        { user ? (
          <div>
          <Form
            placeholder='Submit'
            ws={ ws }
            handleSubmit = { this.handleMessageSubmit }
          />
            <div className='conversation'>
              { lines.map(line => (<Bubble { ...line } />)) }
            </div>
          </div> ) : null
            }

      </>

    )
  }
}

export default App;