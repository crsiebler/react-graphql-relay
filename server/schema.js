import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID
} from "graphql";
import {
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray,
  mutationWithClientMutationId
} from "graphql-relay";

export const Schema = db => {
  let store = {};

  let linkType = new GraphQLObjectType({
    name: "Link",
    fields: () => ({
      id: {
        type: new GraphQLNonNull(GraphQLID),
        resolve: obj => obj._id
      },
      title: { type: GraphQLString },
      url: { type: GraphQLString }
    })
  });

  let linkConnection = connectionDefinitions({
    name: "Link",
    nodeType: linkType
  });

  let storeType = new GraphQLObjectType({
    name: "Store",
    fields: () => ({
      id: globalIdField("Store"),
      linkConnection: {
        type: linkConnection.connectionType,
        args: connectionArgs,
        resolve: (_, args) =>
          connectionFromPromisedArray(
            db
              .collection("links")
              .find({})
              .limit(args.first)
              .toArray(),
            args
          )
      }
    })
  });

  let createLinkMutation = mutationWithClientMutationId({
    name: "CreateLink",
    inputFields: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      url: { type: new GraphQLNonNull(GraphQLString) }
    },
    outputFields: {
      linkEdge: {
        type: linkConnection.edgeType,
        resolve: obj => ({ node: obj.ops[0], cursor: obj.insertedId })
      },
      store: {
        type: storeType,
        resolve: () => store
      }
    },
    mutateAndGetPayload: ({ title, url }) => {
      return db.collection("links").insertOne({ title, url });
    }
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
    }),
    mutation: new GraphQLObjectType({
      name: "Mutation",
      fields: () => ({
        createLink: createLinkMutation
      })
    })
  });

  return schema;
};

export default Schema;
