const express = require("express");
const app = express();
const express_graphql = require("express-graphql");
const schema = require("../schema/types");
const root = require("../schema/resolvers");

const port = process.env.PORT || 4000;

app.use(
  "/graphql",
  express_graphql({
    schema,
    rootValue: root,
    graphiql: true
  })
);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () =>
  console.log("Express GraphQL Server Now Running On localhost:4000/graphql")
);
