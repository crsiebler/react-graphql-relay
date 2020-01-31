export const importLinks = database => {
  const obj = [
    { _id: 1, title: "Google", url: "http://www.google.com" },
    { _id: 2, title: "Bing", url: "http://www.bing.com" }
  ];

  database.collection("links").insertMany(obj, (err, res) => {
    if (err) throw err;
    console.log(res);
  });

  database
    .collection("links")
    .find({})
    .toArray((err, links) => {
      if (err) throw err;
      console.log(links);
      database.close();
    });
};
