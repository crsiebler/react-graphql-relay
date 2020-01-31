import axios from "axios";

export const getLinks = () =>
  axios.post("http://localhost:8080/graphql", {
    query: `{
        links {
            _id,
            title,
            url
        }
    }`
  });
