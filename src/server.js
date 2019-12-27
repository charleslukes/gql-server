const express = require("express");
const expressGraphql = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt
} = require("graphql");
const { authors, books } = require("./data");

// initiates express
const app = express();

// schema for the author type
const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This describes the author properties",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt)
    },
    name: {
      type: GraphQLNonNull(GraphQLString)
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: parent => {
        return books.filter(elem => elem.authorId === parent.id);
      }
    }
  })
});
app.use(
  "/graphql",
  expressGraphql({
    graphiql: true
  })
);

app.listen(5000, () => {
  console.log("server running at port 5000");
});
