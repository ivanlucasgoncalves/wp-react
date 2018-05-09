import React from 'react';
import { Link } from 'react-router-dom';

export default class ContentBlog extends React.Component {
  renderPosts(){
    const { id, title, slug, excerpt, featured_image_src, author_name, published_date, content } = this.props.post;
    return(
      <article id={`post-${id}`}>
        {featured_image_src && 
        <Link to={`blog/${slug}`}>
          <div className="img-blog">
            {featured_image_src ? <img src={featured_image_src} alt={title.rendered} /> : null}
          </div>
        </Link>}
        {published_date && <span className="entry-date">{published_date}</span>}
        {title && <h3><Link to={`blog/${slug}`}>{title.rendered}</Link></h3>}
        {excerpt && <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }}  />}
        <div className="foot-blg-list">
      		<Link to={`blog/${slug}`} className="read-more">Read more...</Link>
      	</div>
      </article>
    );
  }
  render(){
    return(
      <div className="col">
        {this.renderPosts()}
      </div>
    );
  }
}