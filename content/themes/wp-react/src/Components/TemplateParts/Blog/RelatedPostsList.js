import React from 'react';
import { Link } from 'react-router-dom';

export default class RelatedPostsList extends React.Component {
  render(){
    const { ID, title, featured_image_src, slug, excerpt, published_date, comments_number } = this.props.relatedpost;
    return(
      <div className="col">
        <article id={`post-${ID}`} className="col-posts">
          {featured_image_src && 
          <Link to={slug}>
            <div className="img-blog">
              {featured_image_src ? <img src={featured_image_src} /> : null}
            </div>
          </Link>}
          <div className="entry-post-list">
            {published_date && <span className="entry-date">{published_date}</span>}
            {title && <h3><Link to={slug}>{title}</Link></h3>}
            {excerpt && <p dangerouslySetInnerHTML={{ __html: excerpt }}  />}
            <div className="foot-blg-list">
              <Link to={slug} className="read-more">Read more...</Link>
              {comments_number &&
              <div className="comments">
                 <span>{comments_number}</span>
                <svg width="22" height="19" viewBox="0 0 22 19" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.98 7.8c0 3.5-2.87 6.38-6.38 6.38h-2.55l-3.4 3.4v-3.4H7.8c-3.5 0-6.38-2.87-6.38-6.38 0-3.5 2.87-6.38 6.38-6.38h6.8c3.5 0 6.38 2.87 6.38 6.38z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>}
            </div>
          </div>
        </article>
      </div>
    );
  }
}