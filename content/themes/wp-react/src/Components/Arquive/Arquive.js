import React from 'react';

import Post from '../Post/Post';
import Title from '../TemplateParts/Title';
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
  componentWillUnmount() {
    this.getPosts = null;
  }
  componentDidMount() {
    this.getPosts();
  }
  getPosts(){
    //this.setState({ page: this.state.page + 1 });
    //console.log(this.state.page);
    WPReact.fetchPosts().then(response => {
      //console.log(response);
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
        <Title title="Blog" />
        <div className="cntr">
          {this.state.isLoading ? 
            <Loader /> 
            : <Post posts={this.state.posts} />}
        </div>
      </main>
    );
  }
}