import express from "express";
import cors from "cors";

import { MongoClient } from "mongodb";

const port = 8080;
const uri =
  "mongodb://rgrjs:S601MvkvSORXPTeO@rgrjs-shard-00-00-5xcvx.mongodb.net:27017,rgrjs-shard-00-01-5xcvx.mongodb.net:27017,rgrjs-shard-00-02-5xcvx.mongodb.net:27017/rgrjs?ssl=true&replicaSet=rgrjs-shard-0&authSource=admin&retryWrites=true&w=majority";

let db;
let app = express();

app.use(cors());
app.set("port", process.env.PORT || port);

MongoClient.connect(uri, (err, database) => {
  if (err) throw err;

  db = database.db("rgrjs");
  app.listen(port, () => console.log(`Listening on port ${port}`));
});

app.get("/data/links", (req, res) => {
  db.collection("links")
    .find({})
    .toArray((err, links) => {
      if (err) throw err;

      res.json(links);
    });
});
