import { Environment, Network, RecordSource, Store } from "relay-runtime";

const store = new Store(new RecordSource());
const network = Network.create((operation, variables) => {
  return fetch("http://localhost:8080/graphql", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(response => {
    return response.json();
  });
});
const handlerProvider = null;

const environment = new Environment({
  handlerProvider, // Can omit.
  network,
  store
});

export default environment;
