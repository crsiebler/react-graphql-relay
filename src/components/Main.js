import React from "react";
import PropTypes from "prop-types";
import { QueryRenderer, graphql } from "react-relay";

import environment from "../lib/createRelayEnvironment";

import Links from "./Links";

const Main = () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query MainQuery {
        store {
          ...Links_store @arguments(limit: 10)
        }
      }
    `}
    render={({ error, props }) => {
      if (error) {
        return <div>{error.message}</div>;
      } else if (props) {
        return <Links store={props.store} />;
      }
      return <div>Loading</div>;
    }}
  />
);

Main.propTypes = {
  store: PropTypes.object
};

Main.defaultProps = {
  store: { links: [] }
};

export default Main;
