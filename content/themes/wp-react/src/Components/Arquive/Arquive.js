import React from 'react';

import Post from '../Post/Post';
import Title from '../TemplateParts/Title';
import WPReact from '../../Util/WPReact';

export default class Arquive extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      posts: []
    }
    this.getPosts = this.getPosts.bind(this);
  }
  componentWillUnmount() {
    this.getPosts = null;
  }
  componentDidMount() {
    this.getPosts();
  }
  getPosts(){
    WPReact.fetchPosts().then(response => {
      this.setState({
        posts: response
      });
    });
  }
  render(){
    return(
      <main>
        <Title title="Blog" />
        <div className="cntr">
          <Post posts={this.state.posts} />
        </div>
      </main>
    );
  }
}