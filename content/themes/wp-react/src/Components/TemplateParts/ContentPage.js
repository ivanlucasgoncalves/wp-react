import React from 'react';

import Content from './Content';

export default class ContentPage extends React.Component {
  render(){
    return(
      <div>
      {
        this.props.pages.map(page => <Content key={page.id} page={page} />)
      }
      </div>
    );
  }
}