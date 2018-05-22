import React from 'react';

import Loader from '../Loader';

export default class CommentsList extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      comments: [],
      isLoadingComments: true
    }
  }
  getComments(){
    {
      return this.state.comments.map(comment => {
        const { id, author_name, author_avatar_urls, published_comment, content } = comment;
        return(
          <div key={id} className="comment">
            <div className="head-comment">
              {author_avatar_urls && <img className="author-avatar" src={author_avatar_urls['48']} />}
              <div className="ctn-head">
                {author_name && <h4>{author_name}</h4>}
                {published_comment && <span>{published_comment}</span>}
              </div>
            </div>
            {content && <div className="content-comm" dangerouslySetInnerHTML={{ __html: content }}  />}
          </div>
        );
      })
    }
  }
  componentWillUnmount() {
    this.setComments = null;
  }
  componentDidMount(){
    this.setComments();
  }
  setComments(){
    this.fetchComments().then(response => {
      this.setState({
        comments: response,
        isLoadingComments: false
      });
    })
  }
  fetchComments(){
    const { postID } = this.props;
    return fetch(WPReactSettings.URL.api + "/comments?post=" + postID).then(response => {
      if(response.ok){
        return response.json();
      }
      throw new Error ('Request Failed');
    }, networkError => console.log(networkError.message)).then(jsonResponse => {
      return jsonResponse.map(comment => ({
        id: comment.id,
        author_name: comment.author_name,
        author_avatar_urls: comment.author_avatar_urls,
        published_comment: comment.published_comment,
        content: comment.content.rendered
      }));
    });
  }
  render(){
    return(
      <div className="cntr entry-comments">
        <h3>Responses</h3>
        {this.state.isLoadingComments ?
          (
          <div id="loader-comment">
            <div className="loader-inner ball-clip-rotate-multiple">
              <div></div>
              <div></div>
            </div>
          </div>
          ) : this.getComments()}
      </div>
    );
  }
}