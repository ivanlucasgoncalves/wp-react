import React from 'react';

import ContentBlog from '../TemplateParts/ContentBlog';

export default class Post extends React.Component {
  render(){
    return(
      <div className="row">
      {this.props.posts.map(post => <ContentBlog key={post.id} post={post} />)}
      </div>
    );
  }
}