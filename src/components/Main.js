import React from "react";
import PropTypes from "prop-types";
import { createFragmentContainer, graphql } from "react-relay";

const Main = props => {
  const { store, limit } = props;
  return (
    <div>
      <h3>Links</h3>
      <ul>
        {store.links.slice(0, limit).map(link => (
          <li key={link._id}>
            <a href={link.url}>{link.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

Main.propTypes = {
  limit: PropTypes.number,
  store: PropTypes.object.isRequired
};

Main.defaultProps = {
  limit: 4
};

export default createFragmentContainer(Main, {
  store: graphql`
    fragment Main_store on Store {
      links {
        _id
        title
        url
      }
    }
  `
});
