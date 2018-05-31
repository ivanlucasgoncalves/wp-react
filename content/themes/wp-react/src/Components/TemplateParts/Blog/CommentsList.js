import React from 'react';

import Loader from '../Loader';

export default class CommentsList extends React.Component {
  state = {
    comments: [],
    isLoadingComments: true
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
  getComments(){
    {
      const { comments } = this.state;
      return comments.map(comment => {
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
  fetchComments = async () => {
    const { postID } = this.props;
    try {
      const response = await fetch(WPReactSettings.URL.api + "/comments?post=" + postID);
      if(response.ok){
        const jsonResponse = await response.json();
        return jsonResponse.map(comment => ({
          id: comment.id,
          author_name: comment.author_name,
          author_avatar_urls: comment.author_avatar_urls,
          published_comment: comment.published_comment,
          content: comment.content.rendered
        }));
      }
      throw new Error('Request Failed');
    } catch(error) {
      console.log(error);
    }
  }
  render(){
    const { isLoadingComments, comments } = this.state;
    return(
      <div className="cntr entry-comments">
        <h3>Responses</h3>
        {isLoadingComments ?
          (
          <div id="loader-comment">
            <div className="loader-inner ball-clip-rotate-multiple">
              <div></div>
              <div></div>
            </div>
          </div>
          ) : (
            comments.length > 0 ? this.getComments() : <p>No Comments so far.</p>
          )}
      </div>
    );
  }
}