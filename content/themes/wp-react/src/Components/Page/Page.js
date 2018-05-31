import React from 'react';

import ContentPage from '../TemplateParts/ContentPage';
import Loader from '../TemplateParts/Loader';

export default class Page extends React.Component {
  state = {
    pages: [],
    isLoading: true
  }
  componentWillUnmount(){
    this.getPage = null;
  }
  componentDidMount(){
    this.getPage();
  }
  getPage(){
    this.fetchPages().then(response => {
      this.setState({
        pages: response,
        isLoading: false
      });
    })
  }
  fetchPages = async () => {
    let url = window.location.href.split('/');
    let slug = url.pop();
    try {
      const response = await fetch(WPReactSettings.URL.api + "/pages?slug=" + slug);
      if(response.ok){
        const jsonResponse = await response.json();
        return jsonResponse;
      }
    } catch(error) {
      console.log(error);
    }
  }
  render(){
    const { isLoading, pages } = this.state;
    if(isLoading) return <Loader />;
    
    return(
      <main>
        {
          pages.map(page => <ContentPage key={page.id} page={page}/>)
        }
      </main>
    );
  }
}