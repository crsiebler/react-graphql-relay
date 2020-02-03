/**
 * @flow
 * @relayHash af6b32b0ba710ba17b524b5dfbe3c35a
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type MainQueryVariables = {||};
export type MainQueryResponse = {|
  +links: ?$ReadOnlyArray<?{|
    +title: ?string
  |}>
|};
export type MainQuery = {|
  variables: MainQueryVariables,
  response: MainQueryResponse,
|};
*/


/*
query MainQuery {
  links {
    title
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "links",
    "storageKey": null,
    "args": null,
    "concreteType": "Link",
    "plural": true,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "title",
        "args": null,
        "storageKey": null
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "MainQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "MainQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "MainQuery",
    "id": null,
    "text": "query MainQuery {\n  links {\n    title\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2f08a0b1d20ded09fcab1c604b4d482b';
module.exports = node;
