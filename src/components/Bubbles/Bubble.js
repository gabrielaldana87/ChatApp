import React from 'react';

const Bubble =  props  => {
  const { text, user, color } = props;
  if ( !user ) {
    return <p className='connection'> { `${ text }` } </p>
  }
  else if ( !text ){
    return <p className='connection'> { user } has joined the Chat! </p>
  }
  else return <p className='row' style={{ background: color }}>
    <span className='user-box' style={{ background: 'rgba(255,255,255,.3)'}}> { `${ user }:` } </span>
    <strong className='text-box'> { text } </strong>
  </p>
};

export default Bubble;