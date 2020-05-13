const {ApolloServer, gql} = require('apollo-server');
const {buildFederatedSchema} = require('@apollo/federation');

const typeDefs = gql`
    extend type Query {
        comments(postID: Int!): [Comment!]
    }

    extend type Mutation {
        createComment(content: String!, post: Int!): Post
    }

    type Comment @key(fields:"id") {
        id: ID!
        content: String!
        post: Post!
    }

    extend type Post @key(fields: "id") {
        id: ID! @external
        comments: [Comment!]
    }
`;

const resolvers = {
    Comment: {
        __resolveReference: (comment) => comments.find(c => c.id === comment.id),
        post: (comment) => posts.find(p => p.id === comment.post)
    },
    Post: {
        comments: (post) => comments.filter(c => c.post == post.id)
    },
    Query: {
        comments: (_, {postID}) => comments.filter(c => c.post === postID)
    },
    Mutation: {
        createComment: (_, args) => {
            comments.push(args);
            return args;
        }
    }
};

let posts = [
    {id: 1, title: "First post",  content: "Im the content of the first post",  user: 1},
    {id: 2, title: "Second post", content: "Im the content of the Second post", user: 1},
    {id: 3, title: "Third post",  content: "Im the content of the Third post",  user: 1},
    {id: 4, title: "Fourth post", content: "Im the content of the first post",  user: 1},
    {id: 5, title: "Fifth post",  content: "Im the content of the Fifth post",  user: 1}
];

let comments = [
    {id: 1, content: "Waw that's a great post - (1)", post: 1},
    {id: 2, content: "Waw that's a great post - (2)", post: 2},
    {id: 3, content: "Waw that's a great post - (3)", post: 3},
    {id: 4, content: "Waw that's a great post - (4)", post: 4},
    {id: 5, content: "Waw that's a great post - (1)", post: 1},
];

const server = new ApolloServer({
    schema: buildFederatedSchema({
        typeDefs, resolvers
    })
});

module.exports = server;
