import React from 'react';

export default class Title extends React.Component {
  render(){
    return(
      <div className="cntr">
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}