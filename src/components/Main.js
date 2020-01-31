import React, { useEffect, useState } from "react";
import { getLinks } from "../api/links";

export const Main = () => {
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
        {links.map(link => (
          <li key={link._id}>
            <a href={link.url}>{link.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
