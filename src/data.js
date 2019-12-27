const authors = [
  { id: 1, name: "j.k rowling" },
  { id: 2, name: "steve matt" },
  { id: 3, name: "andrew botwin" }
];

const books = [
  { id: 1, name: "Harry Potter", authorId: 1 },
  { id: 2, name: "Evolution", authorId: 2 },
  { id: 3, name: "Magical Science", authorId: 1 },
  { id: 4, name: "ZEus", authorId: 3 },
  { id: 5, name: "Unbroken", authorId: 3 },
  { id: 6, name: "Walking Dead", authorId: 1 },
  { id: 7, name: "Beauty Queen", authorId: 2 },
  { id: 8, name: "Unquestionable", authorId: 1 },
  { id: 9, name: "Legend Eve", authorId: 2 },
  { id: 10, name: "Everest", authorId: 3 }
];

module.exports = {
  books,
  authors
};
