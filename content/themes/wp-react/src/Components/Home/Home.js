import React from 'react';

import Loader from '../TemplateParts/Loader';

export default class Home extends React.Component {
  state = {
    isLoading: true
  }
  componentWillUnmount(){
    this.renderHome = null;
  }
  componentDidMount(){
    this.renderHome();
    this.setState({ isLoading: false });
  }
  renderHome(){
    return(
      <div className="cntr">
        <h1>Home</h1>
      </div>
    );
  }
  render(){
    const { isLoading } = this.state;
    if(isLoading) return <Loader />;
    
    return(
      <main>
        {
          this.renderHome()
        }
      </main>
    );
  }
}