const express = require("express");
const expressGraphql = require("express-graphql");

const app = express();

app.use(
  "/graphql",
  expressGraphql({
    graphiql: true
  })
);

app.listen(5000, () => {
  console.log("server running at port 5000");
});
