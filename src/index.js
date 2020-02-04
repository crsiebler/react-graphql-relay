import React from "react";
import ReactDOM from "react-dom";
import { QueryRenderer, graphql } from "react-relay";

import environment from "./lib/createRelayEnvironment";
import Main from "./components/Main";

ReactDOM.render(
  <QueryRenderer
    environment={environment}
    query={graphql`
      query srcQuery {
        store {
          ...Main_store
        }
      }
    `}
    render={({ error, props }) => {
      if (error) {
        return <div>{error.message}</div>;
      } else if (props) {
        return <Main store={props.store} />;
      }
      return <div>Loading</div>;
    }}
  />,
  document.getElementById("react")
);
