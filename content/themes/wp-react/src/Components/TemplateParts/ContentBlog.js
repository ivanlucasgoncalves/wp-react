import React from 'react';
import { Link } from 'react-router-dom';

import NotFound from '../NotFound/NotFound';

export default class ContentBlog extends React.Component {
  renderEmpty(){
    return(
      <NotFound />
    );
  }
  renderPost(){
    const { id, title, slug, excerpt, featured_image_src, author_name, published_date, content } = this.props.post;
    return(
      <article id={`post-${id}`}>
        <Link to={slug}>
          <div className="img-blog">
            {featured_image_src ? <img className="featured-image" src={featured_image_src} alt="featured image" /> : null}
          </div>
        </Link>
        <span className="entry-date">{published_date}</span>
        <h3><Link to={slug}>{title.rendered}</Link></h3>
        <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }}  />
        <div className="foot-blg-list">
      		<Link to={slug} className="read-more">Read more...</Link>
      	</div>
      </article>
    );
  }
  render(){
    console.log(this.props.post);
    return(
      <div className="col">
        {this.renderPost()}
      </div>
    );
  }
}