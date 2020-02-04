import React from "react";
import PropTypes from "prop-types";
import { createFragmentContainer, graphql } from "react-relay";

const Link = props => {
  const { link } = props;
  return (
    <li>
      <a href={link.url}>{link.title}</a>
    </li>
  );
};

Link.propTypes = {
  link: PropTypes.object.isRequired
};

export default createFragmentContainer(Link, {
  link: graphql`
    fragment Link_link on Link {
      url
      title
    }
  `
});
