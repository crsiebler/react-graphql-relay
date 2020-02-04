import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from "graphql";

export const Schema = db => {
  let store = {};

  let storeType = new GraphQLObjectType({
    name: "Store",
    fields: () => ({
      links: {
        type: new GraphQLList(linkType),
        resolve: () =>
          db
            .collection("links")
            .find({})
            .toArray()
      }
    })
  });

  let linkType = new GraphQLObjectType({
    name: "Link",
    fields: () => ({
      _id: { type: GraphQLString },
      title: { type: GraphQLString },
      url: { type: GraphQLString }
    })
  });

  let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "Query",
      fields: () => ({
        store: {
          type: storeType,
          resolve: () => store
        },
        message: {
          type: GraphQLString,
          resolve: () => "Hello GraphQL!"
        }
      })
    })
  });

  return schema;
};

export default Schema;
