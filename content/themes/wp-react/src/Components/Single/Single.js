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
  componentDidUpdate(prevProps, prevState) {
    if(prevProps != this.props) {
      this.setState({ isLoading: true });
      this.getSingle();
    }
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
      {this.state.isLoading ? 
        <Loader /> 
        : <ContentSingle post={this.state.post} />}
      </main>
    );
  }
}