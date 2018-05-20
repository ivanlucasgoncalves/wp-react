import React from 'react';

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
    return(
      <div className="cntr entry-comments">
        <form className="form-comments" onSubmit={this.handleSubmit}>
          <h3>Comments</h3>
          <textarea value={this.state.comment} onChange={this.handleCommentChange} placeholder="Comments"></textarea>
          <div className="dual-input">
            <input type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="Name" />
            <input type="email" value={this.state.email} onChange={this.handleEmailChange} placeholder="Email" />
          </div>
          <input className="input-submit" type="submit" value="Add Comment"/>
        </form>
      </div>
    );
  }
}