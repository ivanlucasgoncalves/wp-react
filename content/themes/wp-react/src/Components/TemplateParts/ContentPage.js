import React from 'react';

export default class ContentPage extends React.Component {
  renderPage(){
    const { id, title, content } = this.props.page;
    return(
      <article id={`page-${id}`}>
        {title && <h1>{title.rendered}</h1>}
        {content &&
        <div className="entry-content">
      		<div dangerouslySetInnerHTML={{ __html: content.rendered }}  />
      	</div>}
      </article>
    );
  }
  render(){
    console.log(this.props.page)
    return(
      <div>
        {this.renderPage()}
      </div>
    );
  }
}