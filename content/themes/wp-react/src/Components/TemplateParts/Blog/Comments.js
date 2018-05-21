import React from 'react';

import CommentsList from './CommentsList';

export default class Comments extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      comment: '',
      name: '',
      email: ''
    }
    
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleCommentChange(event){
    this.setState({ 
      comment: event.target.value
    });
  }
  handleNameChange(event){
    this.setState({ 
      name: event.target.value
    });
  }
  handleEmailChange(event){
    this.setState({ 
      email: event.target.value
    });
  }
  handleSubmit(event){
    event.preventDefault();
    this.postComment();
  }
  postComment(){
    const { postID } = this.props;
    const { comment, name, email } = this.state;
    
    return fetch(WPReactSettings.URL.api + "/comments?post=" + postID, {
      method: 'POST',
      headers: {
       "Content-type": "application/json"
      },
      body: JSON.stringify({
        author_name: name,
        author_email: email,
        content: comment
      })
    }).then(response => {
        if(response.ok){
          return response.json();
        }
        throw new Error('Request Failed!');
      }, networkError => console.log(networkError.message)
    );
  }
  render(){
    const { postID } = this.props;
    return(
      <section className="comments-wrapper">
        <CommentsList postID={postID} />
        <div className="cntr entry-comments">
          <form className="form-comments" onSubmit={this.handleSubmit}>
            <h3>
              <span>Add Comment</span>
              <svg width="22" height="19" viewBox="0 0 22 19">
                <path d="M20.98 7.8c0 3.5-2.87 6.38-6.38 6.38h-2.55l-3.4 3.4v-3.4H7.8c-3.5 0-6.38-2.87-6.38-6.38 0-3.5 2.87-6.38 6.38-6.38h6.8c3.5 0 6.38 2.87 6.38 6.38z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </h3>
            <textarea value={this.state.comment} onChange={this.handleCommentChange} placeholder="Write a Comment..."></textarea>
            <div className="dual-input">
              <input type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="Name" />
              <input type="email" value={this.state.email} onChange={this.handleEmailChange} placeholder="Email" />
            </div>
            <input className="input-submit" type="submit" value="Post Comment"/>
          </form>
        </div>
      </section>
    );
  }
}