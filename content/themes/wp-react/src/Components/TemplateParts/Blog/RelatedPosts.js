import React from 'react';
import { Link } from 'react-router-dom';

import RelatedPostsList from './RelatedPostsList';

const RelatedPosts = props => {
  const { relatedposts } = props;
  return(
    <div className="related-posts">
      <div className="cntr">
        <h2>Related Posts</h2>
      </div>
      <div className="cntr">
        <div className="row">
          {
            relatedposts.map(relatedpost => <RelatedPostsList key={relatedpost.id} relatedpost={relatedpost}/>)
          }
        </div>
      </div>
    </div>
  );
}

export default RelatedPosts;