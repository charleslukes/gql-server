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

// schema for the book type
const BookType = new GraphQLObjectType({
  name: "Book",
  description: "The book properties",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt)
    },
    name: {
      type: GraphQLNonNull(GraphQLString)
    },
    authorId: {
      type: GraphQLNonNull(GraphQLInt)
    },
    author: {
      type: AuthorType,
      resolve: parent => {
        return authors.find(elem => elem.id === parent.authorId);
      }
    }
  })
});

// schema for the root query
const rootQuery = new GraphQLObjectType({
  name: "Query",
  description: "This is the root query",
  fields: () => ({
    book: {
      type: BookType,
      description: "A single book",
      args: {
        id: {
          type: GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (parent, args) => {
        return books.find(elem => elem.id === args.id);
      }
    },

    books: {
      type: new GraphQLList(BookType),
      description: "A list of all available books",
      resolve: () => {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "A list of all authors",
      resolve: () => {
        return authors;
      }
    }
  })
});

const schema = new GraphQLSchema({
  query: rootQuery
});
// use graphiql interface
app.use(
  "/graphql",
  expressGraphql({
    schema,
    graphiql: true
  })
);

// serving the app
app.listen(5000, () => {
  console.log("server running at port 5000");
});
