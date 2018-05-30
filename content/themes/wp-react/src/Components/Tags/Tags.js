import React from 'react';

import Loader from '../TemplateParts/Loader';
import ContentTag from '../TemplateParts/ContentTag';

export default class Tags extends React.Component {
  state = {
    post_tags: [],
    isLoading: true
  }
  componentWillUnmount() {
    this.getPostsInTag = null;
  }
  componentDidMount() {
    this.getPostsInTag();
  }
  componentDidUpdate(prevProps) {
    if(prevProps != this.props) {
      this.setState({ isLoading: true });
      this.getPostsInTag();
    }
  }
  getPostsInTag(){
    this.fetchPostsInTag().then(response => {
      this.setState({
        post_tags: response,
        isLoading: false
      });
    });
  }
  fetchPostsInTag = async () => {
    let url = window.location.href.split('/');
    let slug = url.pop();
    
    try{
      const response = await fetch(WPReactSettings.URL.api + "/tags_in_post/" + slug);
      if(response.ok){
        const jsonResponse = await response.json();
        return jsonResponse;
      }
      throw new Error('Request Failed');
    } catch(error){
      console.log(error);
    }
  }
  render(){
    return(
      <main>
      {this.state.isLoading ? (
        <div className="cntr">
          <Loader />
        </div>
        ) : (
        <div className="cntr">
          <div className="row">
            {
              this.state.post_tags.map(tag => <ContentTag key={tag.id} tag={tag}/>)
            }
          </div>
        </div>
      )}
      </main>
    );
  }
}