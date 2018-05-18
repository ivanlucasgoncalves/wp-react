import React from 'react';

import ContentPage from '../TemplateParts/ContentPage';
import Loader from '../TemplateParts/Loader';
import WPReact from '../../Util/WPReact';

export default class Page extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      pages: [],
      isLoading: true
    }
  }
  componentWillUnmount(){
    this.getPage = null;
  }
  componentDidMount(){
    this.getPage();
  }
  getPage(){
    WPReact.fetchPages().then(response => {
      this.setState({
        pages: response,
        isLoading: false
      });
    })
  }
  render(){
    return(
      <main>
      {this.state.isLoading ? 
        <Loader /> 
        : this.state.pages.map(page => <ContentPage key={page.id} page={page}/>)}
      </main>
    );
  }
}