import React from 'react';
import { Link } from 'react-router-dom';

import TagsList from './Blog/TagsList';

export default class ContentBlog extends React.Component {
  constructor(props){
    super(props);
    
    this.handlePostView = this.handlePostView.bind(this);
  }
  handlePostView(event){
    const { id } = this.props.post;

    fetch(WPReactSettings.URL.api + "/post_views/" + id, {
      method: 'POST'
    }).then(response => {
        if(response.ok){
          return response.json();
        }
        throw new Error('Request Failed!');
      }, networkError => console.log(networkError.message)
    );
  }
  renderPosts(){
    const { id, title, slug, excerpt, featured_image_src, author_name, author_avatar, published_date, tags_post, views, love_it, comments_number, content } = this.props.post;
    return(
      <article id={`post-${id}`} className="col-posts">
        {featured_image_src && 
        <Link to={`blog/${slug}`} onClick={this.handlePostView}>
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
          {title && <h3><Link to={`blog/${slug}`} onClick={this.handlePostView}>{title.rendered}</Link></h3>}
          {excerpt && <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }}  />}
          <div className="foot-blg-list">
            <div className="view-count">
              <svg width="24" height="24" viewBox="0 0 511.99 511.99" >
            		<path d="m510.1 249.94c-4.032-5.867-100.93-143.28-254.1-143.28-131.44 0-248.56 136.62-253.48 142.44-3.349 3.968-3.349 9.792 0 13.781 4.928 5.824 122.05 142.44 253.48 142.44s248.55-136.62 253.48-142.44c3.094-3.669 3.371-8.981 0.619-12.949zm-254.1 134.06c-105.36 0-205.55-100.48-231-128 25.408-27.541 125.48-128 231-128 123.28 0 210.3 100.33 231.55 127.42-24.534 26.645-125.29 128.58-231.55 128.58z"/>
            		<path d="m256 170.66c-47.061 0-85.333 38.272-85.333 85.333s38.272 85.333 85.333 85.333 85.333-38.272 85.333-85.333-38.272-85.333-85.333-85.333zm0 149.33c-35.285 0-64-28.715-64-64s28.715-64 64-64 64 28.715 64 64-28.715 64-64 64z"/>
              </svg>
              <span>{views}</span>
            </div>
            <div className="inf-post">
              <div className="love-it">
                <svg width="19" height="19" viewBox="0 0 490.4 490.4">
                  <path d="m222.5 453.7c6.1 6.1 14.3 9.5 22.9 9.5 8.5 0 16.9-3.5 22.9-9.5l179.7-179.7c27.3-27.3 42.3-63.6 42.4-102.1 0-38.6-15-74.9-42.3-102.2s-63.5-42.3-102.1-42.3c-37.9 0-73.6 14.5-100.7 40.9-27.2-26.5-63-41.1-101-41.1-38.5 0-74.7 15-102 42.2-27.3 27.3-42.3 63.6-42.3 102.2 0 38.5 15.1 74.8 42.4 102.1l180.1 180zm-162.8-366.9c22.6-22.6 52.7-35.1 84.7-35.1s62.2 12.5 84.9 35.2l7.4 7.4c2.3 2.3 5.4 3.6 8.7 3.6 3.2 0 6.4-1.3 8.7-3.6l7.2-7.2c22.7-22.7 52.8-35.2 84.9-35.2 32 0 62.1 12.5 84.7 35.1 22.7 22.7 35.1 52.8 35.1 84.8s-12.5 62.1-35.2 84.8l-179.8 179.8c-2.9 2.9-8.2 2.9-11.2 0l-180-180c-22.7-22.7-35.2-52.8-35.2-84.8s12.5-62.1 35.1-84.8z"/>
                </svg>
                <span>{love_it}</span>
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