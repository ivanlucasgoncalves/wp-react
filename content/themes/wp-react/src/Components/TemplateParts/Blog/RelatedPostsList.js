import React from 'react';
import { Link } from 'react-router-dom';

export default class RelatedPostsList extends React.Component {
  render(){
    console.log(this.props.relatedpost);
    const { ID, title, featured_image_src, slug, excerpt, author_name, author_avatar, published_date, love_it, comments_number } = this.props.relatedpost;
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
            <div className="head-post-list">
              {author_avatar && <img className="entry-author_avatar" src={author_avatar} alt={author_name} />}
              {author_name && <span className="entry-author_name">{author_name}</span>}
              {published_date && <span className="entry-date">{published_date}</span>}
            </div>
            {title && <h3><Link to={slug}>{title}</Link></h3>}
            {excerpt && <p dangerouslySetInnerHTML={{ __html: excerpt }}  />}
            <div className="foot-blg-list">
              <Link to={slug} className="read-more">Read more...</Link>
              <div className="inf-post">
                <div className="love-it">
                  <svg width="19" height="19" viewBox="0 0 490.4 490.4">
                		<path d="m222.5 453.7c6.1 6.1 14.3 9.5 22.9 9.5 8.5 0 16.9-3.5 22.9-9.5l179.7-179.7c27.3-27.3 42.3-63.6 42.4-102.1 0-38.6-15-74.9-42.3-102.2s-63.5-42.3-102.1-42.3c-37.9 0-73.6 14.5-100.7 40.9-27.2-26.5-63-41.1-101-41.1-38.5 0-74.7 15-102 42.2-27.3 27.3-42.3 63.6-42.3 102.2 0 38.5 15.1 74.8 42.4 102.1l180.1 180zm-162.8-366.9c22.6-22.6 52.7-35.1 84.7-35.1s62.2 12.5 84.9 35.2l7.4 7.4c2.3 2.3 5.4 3.6 8.7 3.6 3.2 0 6.4-1.3 8.7-3.6l7.2-7.2c22.7-22.7 52.8-35.2 84.9-35.2 32 0 62.1 12.5 84.7 35.1 22.7 22.7 35.1 52.8 35.1 84.8s-12.5 62.1-35.2 84.8l-179.8 179.8c-2.9 2.9-8.2 2.9-11.2 0l-180-180c-22.7-22.7-35.2-52.8-35.2-84.8s12.5-62.1 35.1-84.8z"/>
                  </svg>
                  <span>{love_it == null ? '0' : love_it}</span>
                </div>
                {comments_number &&
                <div className="comments">
                  <svg width="22" height="19" viewBox="0 0 22 19">
                    <path d="M20.98 7.8c0 3.5-2.87 6.38-6.38 6.38h-2.55l-3.4 3.4v-3.4H7.8c-3.5 0-6.38-2.87-6.38-6.38 0-3.5 2.87-6.38 6.38-6.38h6.8c3.5 0 6.38 2.87 6.38 6.38z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>{comments_number}</span>
                </div>}
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}