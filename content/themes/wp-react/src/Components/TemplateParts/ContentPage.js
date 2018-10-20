import React from 'react';

const ContentPage = props => {
  const renderPage = () => {
    const { id, title, content } = props.page;
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
  return(
    <div className="ctn-page">
      <div className="top-header">
        <div className="cntr">
          <h1>Sample Page</h1>
        </div>
      </div>
      {
        renderPage()
      }
    </div>
  );
}

export default ContentPage;