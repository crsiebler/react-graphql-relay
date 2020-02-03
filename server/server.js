import fs from "fs";
import express from "express";
import cors from "cors";
import GraphQLHTTP from "express-graphql";
import { MongoClient } from "mongodb";
import { graphql } from "graphql";
import { introspectionQuery } from "graphql/utilities";

import { Schema } from "./schema";

const port = 8080;
const uri =
  "mongodb://rgrjs:S601MvkvSORXPTeO@rgrjs-shard-00-00-5xcvx.mongodb.net:27017,rgrjs-shard-00-01-5xcvx.mongodb.net:27017,rgrjs-shard-00-02-5xcvx.mongodb.net:27017/rgrjs?ssl=true&replicaSet=rgrjs-shard-0&authSource=admin&retryWrites=true&w=majority"; // cspell:disable-line

let app = express();

app.set("port", process.env.PORT || port);
app.use(cors());

(async () => {
  let database = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  let schema = Schema(database.db("rgrjs"));

  app.use(
    "/graphql",
    GraphQLHTTP({
      schema: schema,
      graphiql: true
    })
  );

  app.listen(port, () => console.log(`Listening on port ${port}`));

  // Generate schema.json
  let json = await graphql(schema, introspectionQuery);
  fs.writeFile("./data/schema.json", JSON.stringify(json, null, 2), err => {
    if (err) throw err;

    console.log("JSON schema created");
  });
})();
