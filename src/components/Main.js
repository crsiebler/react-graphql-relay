import React from "react";
// import Server from "../api";
// import LinkStore from "../stores/LinkStore";

// let _getAppState = () => {
//   return { links: LinkStore.getAll() };
// };

export const Main = () => {
  const links = [];
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
