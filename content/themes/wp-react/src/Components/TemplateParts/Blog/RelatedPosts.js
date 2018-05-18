import React from 'react';
import { Link } from 'react-router-dom';

import RelatedPostsList from './RelatedPostsList';

export default class RelatedPosts extends React.Component {
  render(){
    const { relatedposts } = this.props;
    return(
      <div className="related-posts">
        <div className="cntr">
          <h2>Related Posts</h2>
        </div>
        <div className="cntr">
          <div className="row">
            {
              relatedposts.map(relatedpost => <RelatedPostsList key={relatedpost.ID} relatedpost={relatedpost}/>)
            }
          </div>
        </div>
      </div>
    );
  }
}