import React from 'react';

import PostNavigation from './Blog/PostNavigation';
import RelatedPosts from './Blog/RelatedPosts';
import Comments from './Blog/Comments';

export default class ContentSingle extends React.Component {
  constructor(props){
    super(props);
    
    this.handleLoveIt = this.handleLoveIt.bind(this);
  }
  handleLoveIt(){
    const { id } = this.props.post;
    //console.log(`Love it ${id}`);
    return fetch(WPReactSettings.URL.api + "/loves/" + id, {
      method: 'POST',
      headers: {
       "Content-type": "application/json"
      }
    }).then(response => {
        if(response.ok){
          return response.json();
        }
        throw new Error('Request Failed!');
      }, networkError => console.log(networkError.message)
    );
  }
  renderSingle(){
    const { id, title, excerpt, featured_image_src, author_name, author_avatar, published_date, content, _embedded } = this.props.post;
    return(
      <article id={`post-${id}`} className="single">
        <div className="cntr">
          <button onClick={this.handleLoveIt}>Love it</button>
          <div className="meta">
            <div className="author-avatar">{author_avatar && <img src={author_avatar} alt={author_name && author_name} />}</div>
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
    //console.log(this.props.post)
    const { id, next_post, previous_post, related_posts } = this.props.post;
    return(
      <div className="blog-wrapper">
        {
          this.renderSingle()
        }
        <Comments postID={id} />
        <PostNavigation next={next_post} prev={previous_post} />
        <RelatedPosts relatedposts={related_posts} />
      </div>
    );
  }
}