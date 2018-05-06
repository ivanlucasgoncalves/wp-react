import React from 'react';

import ContentPage from '../TemplateParts/ContentPage';
import WPReact from '../../Util/WPReact';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      pages: []
    }
  }
  componentDidMount() {
    WPReact.fetchPages().then(response => {
      this.setState({
        pages: response
      });
    });
  }
  render(){
    return (
      <div>
        <ContentPage pages={this.state.pages} />
      </div>
    );
  }
}