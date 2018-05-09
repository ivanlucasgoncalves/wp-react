import React from 'react';

import ContentSingle from '../TemplateParts/ContentSingle';
import Loader from '../TemplateParts/Loader';
import WPReact from '../../Util/WPReact';

export default class Single extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      post: [],
      isLoading: true
    }
  }
  componentWillUnmount() {
    this.getSingle = null;
  }
  componentDidMount() {
    this.getSingle();
  }
  getSingle(){
    WPReact.fetchSingle().then(response => {
      this.setState({
        post: response,
        isLoading: false
      });
    });
  }
  render(){
    //console.log(this.state.post);
    return(
      <main>
        <div className="cntr">
          {this.state.isLoading ? 
            <Loader /> 
            : <ContentSingle post={this.state.post} />}
        </div>
      </main>
    );
  }
}