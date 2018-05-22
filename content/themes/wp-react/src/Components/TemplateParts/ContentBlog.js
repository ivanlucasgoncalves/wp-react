import React from 'react';
import { Link } from 'react-router-dom';

import TagsList from './Blog/TagsList';

export default class ContentBlog extends React.Component {
  renderPosts(){
    const { id, title, slug, excerpt, featured_image_src, author_name, author_avatar, published_date, tags_post, comments_number, content } = this.props.post;
    return(
      <article id={`post-${id}`} className="col-posts">
        {featured_image_src && 
        <Link to={`blog/${slug}`}>
          <div className="img-blog">
            {featured_image_src ? <img src={featured_image_src} alt={title.rendered} /> : null}
          </div>
        </Link>}
        {tags_post &&
        <div className="tags">{tags_post.map(tag => 
          <TagsList key={tag.term_id} tag={tag} />)}
        </div>}
        <div className="entry-post-list">
          <div className="head-post-list">
            {author_avatar && <img className="entry-author_avatar" src={author_avatar} alt={author_name} />}
            {author_name && <span className="entry-author_name">{author_name}</span>}
            {published_date && <span className="entry-date">{published_date}</span>}
          </div>
          {title && <h3><Link to={`blog/${slug}`}>{title.rendered}</Link></h3>}
          {excerpt && <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }}  />}
          <div className="foot-blg-list">
            <Link to={`blog/${slug}`} className="read-more">Read more...</Link>
            {comments_number &&
            <div className="comments">
              <span>{comments_number}</span>
              <svg width="22" height="19" viewBox="0 0 22 19">
                <path d="M20.98 7.8c0 3.5-2.87 6.38-6.38 6.38h-2.55l-3.4 3.4v-3.4H7.8c-3.5 0-6.38-2.87-6.38-6.38 0-3.5 2.87-6.38 6.38-6.38h6.8c3.5 0 6.38 2.87 6.38 6.38z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>}
          </div>
        </div>
      </article>
    );
  }
  render(){
    return(
      <div className="col">
        {
          this.renderPosts()
        }
      </div>
    );
  }
}