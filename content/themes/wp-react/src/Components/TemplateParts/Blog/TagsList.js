import React from 'react';

export default class TagsList extends React.Component {
  render(){
    const { name, slug } = this.props.tag;
    return(
      <span className={`tag-${slug}`}>
        {name}
      </span>
    );
  }
}