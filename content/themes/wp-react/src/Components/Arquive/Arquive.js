import React from 'react';

import Post from '../Post/Post';
import TopHeader from '../TemplateParts/Blog/TopHeader';
import Loader from '../TemplateParts/Loader';
import WPReact from '../../Util/WPReact';

export default class Arquive extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      posts: [],
      page: 0,
      isLoading: true
    }
  }
  componentWillUnmount(){
    this.getPosts = null;
  }
  componentDidMount(){
    this.getPosts();
  }
  getPosts(){
    WPReact.fetchPosts().then(response => {
      this.setState({
        posts: response,
        page: this.state.page + 1,
        isLoading: false
      });
    });
  }
  render(){
    return(
      <main>
      {this.state.isLoading ? (
        <div className="cntr">
          <Loader />
        </div>
        ) : (
        <div>
          <TopHeader />
          <div className="cntr">
            <Post posts={this.state.posts} />
          </div>
        </div>
      )}
      </main>
    );
  }
}