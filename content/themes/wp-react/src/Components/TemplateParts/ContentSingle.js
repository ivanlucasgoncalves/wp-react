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
    const btn = document.getElementById('btn-love-it');

    fetch(WPReactSettings.URL.api + "/loves/" + id, {
      method: 'POST'
    }).then(response => {
        if(response.ok){
          btn.classList.add('love-it-actived');
          btn.disabled = true;
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
          <div className="meta">
            <div className="head-single">
              <div className="author-avatar">{author_avatar && <img src={author_avatar} alt={author_name && author_name} />}</div>
              <div className="ctn-meta">
                {author_name && <h5 className="author-title">{author_name}</h5>}
                {published_date && <span className="entry-date">Posted on {published_date}</span>}
              </div>
            </div>
            <button id="btn-love-it" onClick={this.handleLoveIt}>
              <svg width="24" height="24" viewBox="0 0 490.4 490.4">
                <path d="m222.5 453.7c6.1 6.1 14.3 9.5 22.9 9.5 8.5 0 16.9-3.5 22.9-9.5l179.7-179.7c27.3-27.3 42.3-63.6 42.4-102.1 0-38.6-15-74.9-42.3-102.2s-63.5-42.3-102.1-42.3c-37.9 0-73.6 14.5-100.7 40.9-27.2-26.5-63-41.1-101-41.1-38.5 0-74.7 15-102 42.2-27.3 27.3-42.3 63.6-42.3 102.2 0 38.5 15.1 74.8 42.4 102.1l180.1 180zm-162.8-366.9c22.6-22.6 52.7-35.1 84.7-35.1s62.2 12.5 84.9 35.2l7.4 7.4c2.3 2.3 5.4 3.6 8.7 3.6 3.2 0 6.4-1.3 8.7-3.6l7.2-7.2c22.7-22.7 52.8-35.2 84.9-35.2 32 0 62.1 12.5 84.7 35.1 22.7 22.7 35.1 52.8 35.1 84.8s-12.5 62.1-35.2 84.8l-179.8 179.8c-2.9 2.9-8.2 2.9-11.2 0l-180-180c-22.7-22.7-35.2-52.8-35.2-84.8s12.5-62.1 35.1-84.8z"/>
              </svg>
            </button>
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