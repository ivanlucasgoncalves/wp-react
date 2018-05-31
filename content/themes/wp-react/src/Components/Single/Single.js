import React from 'react';

import ContentSingle from '../TemplateParts/ContentSingle';
import Loader from '../TemplateParts/Loader';

export default class Single extends React.Component {
  state = {
    post: [],
    isLoading: true
  }
  componentWillUnmount() {
    this.getSingle = null;
  }
  componentDidMount() {
    this.getSingle();
  }
  componentDidUpdate(prevProps) {
    if(prevProps != this.props) {
      this.setState({ isLoading: true });
      this.getSingle();
    }
  }
  getSingle(){
    this.fetchSingle().then(response => {
      this.setState({
        post: response,
        isLoading: false
      });
    });
  }
  fetchSingle = async () => {
    let url = window.location.href.split('/');
    let slug = url.pop();
    try {
      const response = await fetch(WPReactSettings.URL.api + "/posts?slug=" + slug + "&_embed");
      if(response.ok){
        const jsonResponse = await response.json();
        return jsonResponse[0];
      }
      throw new Error('Request Failed!');
    } catch(error) {
      console.log(error);
    }
  }
  render(){
    const { isLoading, post } = this.state;
    if(isLoading) return <Loader />;
    
    return(
      <main>
        {
          <ContentSingle post={post} />
        }
      </main>
    );
  }
}