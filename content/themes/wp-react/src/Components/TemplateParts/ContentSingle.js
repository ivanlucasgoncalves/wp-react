import React from 'react';

import PostNavigation from './Blog/PostNavigation';
import RelatedPosts from './Blog/RelatedPosts';

export default class ContentSingle extends React.Component {
  renderSingle(){
    const { id, title, excerpt, featured_image_src, author_name, published_date, content, _embedded } = this.props.post;
    return(
      <article id={`post-${id}`} className="single">
        <div className="cntr">
          <div className="meta">
            <div className="author-avatar"></div>
            <div className="ctn-meta">
              {author_name && <h5 className="author-title">{author_name}</h5>}
              {published_date && <span className="entry-date">Posted on {published_date}</span>}
            </div>
          </div>
          {title && <h1>{title.rendered}</h1>}
          {excerpt && <div className="excerpt" dangerouslySetInnerHTML={{ __html: excerpt.rendered }}  />}
        </div>
        {featured_image_src && 
        <div className="cntr wide full-thumbnail">
      		<img src={_embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url} />
      	</div>}
        {content &&
        <div className="cntr entry-content">
      		<div dangerouslySetInnerHTML={{ __html: content.rendered }}  />
      	</div>}
      </article>
    );
  }
  render(){
    console.log(this.props.post)
    const { next_post, previous_post, related_posts } = this.props.post;
    return(
      <div className="blog-wrapper">
        {this.renderSingle()}
        <PostNavigation next={next_post} prev={previous_post}/>
        <div className="related-posts">
          <div className="cntr">
            <h2>Related Posts</h2>
          </div>
          <div className="cntr">
            <div className="row">
              {related_posts.map(related_post => <RelatedPosts key={related_post.ID} relatedposts={related_post}/>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}