import express from "express";
import cors from "cors";
import GraphQLHTTP from "express-graphql";
import { MongoClient } from "mongodb";

import Schema from "./data/schema";

const port = 8080;
const uri =
  "mongodb://rgrjs:S601MvkvSORXPTeO@rgrjs-shard-00-00-5xcvx.mongodb.net:27017,rgrjs-shard-00-01-5xcvx.mongodb.net:27017,rgrjs-shard-00-02-5xcvx.mongodb.net:27017/rgrjs?ssl=true&replicaSet=rgrjs-shard-0&authSource=admin&retryWrites=true&w=majority";

let app = express();

app.set("port", process.env.PORT || port);
app.use(cors());

(async () => {
  let database = await MongoClient.connect(uri);

  app.use(
    "/graphql",
    GraphQLHTTP({
      schema: Schema(database.db("rgrjs")),
      graphiql: true
    })
  );

  app.listen(port, () => console.log(`Listening on port ${port}`));
})();
