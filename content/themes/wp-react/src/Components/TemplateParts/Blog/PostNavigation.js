import React from 'react';
import { Link } from 'react-router-dom';

export default class PostNavigation extends React.Component {
  render(){
    const { prev, next } = this.props;
    return(
      <div className="post-nav">
        <div className={prev && next || prev ? 'cntr has-initial' : 'cntr has-next'}>
          {prev &&
            <Link to={prev.post_name} className="prev-post">
              <span>Previous Post</span>
              <h5>{prev.post_title}</h5>
            </Link>}
          {next &&
            <Link to={next.post_name} className="next-post">
              <span>Next Post</span>
              <h5>{next.post_title}</h5>
            </Link>}
        </div>
      </div>
    );
  }
}