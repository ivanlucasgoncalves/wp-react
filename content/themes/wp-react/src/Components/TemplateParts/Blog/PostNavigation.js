import React from 'react';
import { Link } from 'react-router-dom';

export default class PostNavigation extends React.Component {
  render(){
    return(
      <div className="post-nav">
        <div className={this.props.prev && this.props.next || this.props.prev ? 'cntr has-initial' : 'cntr has-next'}>
          {this.props.prev &&
            <Link to={this.props.prev.post_name} className="prev-post">
              <span>Previous Post</span>
              <h5>{this.props.prev.post_title}</h5>
            </Link>}
          {this.props.next &&
            <Link to={this.props.next.post_name} className="next-post">
              <span>Next Post</span>
              <h5>{this.props.next.post_title}</h5>
            </Link>}
        </div>
      </div>
    );
  }
}