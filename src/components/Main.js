import React from "react";
import PropTypes from "prop-types";
import { createFragmentContainer, graphql } from "react-relay";

import Link from "./Link";

const Main = props => {
  const { store } = props;
  console.log(store);
  return (
    <div>
      <h3>Links</h3>
      <ul>
        {store.linkConnection.edges.map(edge => (
          <Link key={edge.node.id} link={edge.node} />
        ))}
      </ul>
    </div>
  );
};

Main.propTypes = {
  store: PropTypes.object.isRequired
};

export default createFragmentContainer(Main, {
  store: graphql`
    fragment Main_store on Store
      @argumentDefinitions(limit: { type: "Int", defaultValue: 1 }) {
      linkConnection(first: $limit) {
        edges {
          node {
            id
            ...Link_link
          }
        }
      }
    }
  `
});
