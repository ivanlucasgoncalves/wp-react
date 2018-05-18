import React from 'react';

export default class ContentPage extends React.Component {
  renderPage(){
    const { id, title, content } = this.props.page;
    return(
      <div className="cntr">
        <article id={`page-${id}`}>
          {content &&
          <div className="entry-content">
        		<div dangerouslySetInnerHTML={{ __html: content.rendered }}  />
        	</div>}
        </article>
      </div>
    );
  }
  render(){
    return(
      <div>
        <div className="top-header">
          <div className="cntr">
            <h1>Sample Page</h1>
          </div>
        </div>
        {
          this.renderPage()
        }
      </div>
    );
  }
}