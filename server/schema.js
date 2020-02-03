import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from "graphql";

export const Schema = db => {
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
        links: {
          type: new GraphQLList(linkType),
          resolve: () =>
            db
              .collection("links")
              .find({})
              .toArray()
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
