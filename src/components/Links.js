import React, { useState } from "react";
import PropTypes from "prop-types";
import { createFragmentContainer, graphql, commitMutation } from "react-relay";

import environment from "../lib/createRelayEnvironment";

import Link from "./Link";

const Links = props => {
  const { store } = props;

  const [input, setInput] = useState({ title: "", url: "" });

  const handleSubmit = e => {
    e.preventDefault();
    if (input.title.length > 0 && input.url.length > 0) {
      commitMutation(environment, {
        mutation: graphql`
          mutation LinksMutation($input: CreateLinkInput!) {
            createLink(input: $input) {
              clientMutationId
              linkEdge {
                node {
                  id
                  title
                  url
                }
              }
            }
          }
        `,
        variables: {
          input: {
            title: input.title,
            url: input.url
          }
        },
        onCompleted: () => {
          setInput({ title: "", url: "" });
          console.log("COMPLETED");
        },
        onError: () => {
          console.log("ERROR");
        }
      });
    }
  };

  const handleInputChange = e => {
    const { id, value } = e.target;
    setInput({ ...input, [id]: value });
  };

  return (
    <div>
      <h3>Links</h3>
      <form onSubmit={handleSubmit}>
        <input
          id="title"
          type="text"
          placeholder="Title"
          onChange={handleInputChange}
        />
        <input
          id="url"
          type="text"
          placeholder="URL"
          onChange={handleInputChange}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {store.linkConnection.edges.map(edge => (
          <Link key={edge.node.id} link={edge.node} />
        ))}
      </ul>
    </div>
  );
};

Links.propTypes = {
  store: PropTypes.object.isRequired
};

export default createFragmentContainer(Links, {
  store: graphql`
    fragment Links_store on Store
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
