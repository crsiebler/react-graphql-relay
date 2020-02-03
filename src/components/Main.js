import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "react-relay";

import { getLinks } from "../api/links";

export const Main = limit => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    getLinks()
      .then(res => {
        setLinks(res.data.data.links);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h3>Links</h3>
      <ul>
        {links.slice(0, limit).map(link => (
          <li key={link._id}>
            <a href={link.url}>{link.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

Main.propTypes = {
  limit: PropTypes.number
};

Main.defaultProps = {
  limit: 4
};

console.log(
  graphql`
    query MainQuery {
      links {
        title
      }
    }
  `
);

export default Main;
