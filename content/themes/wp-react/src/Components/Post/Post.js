import React from 'react';

import ContentBlog from '../TemplateParts/ContentBlog';

const Post = props => (
  <div className="row">
    {
      props.posts.map(post => <ContentBlog key={post.id} post={post} />)
    }
  </div>
);

export default Post;

