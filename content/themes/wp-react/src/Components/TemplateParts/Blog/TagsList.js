import React from 'react';
import { Link } from 'react-router-dom';

const TagsList = props => {
  const { term_id, name, slug } = props.tag;
  return(
    <Link to={WPReactSettings.path + `tag/${slug}`} className={`tag-${slug}`}>
      {name}
    </Link>
  );
}

export default TagsList;