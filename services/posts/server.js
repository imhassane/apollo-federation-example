const {ApolloServer, gql} = require('apollo-server');
const {buildFederatedSchema} = require('@apollo/federation');

const typeDefs = gql`
    extend type Query {
        posts: [Post!]
        post(id: Int!): Post
    }

    extend type Mutation {
        createPost(title: String!, content: String!, author: Int!): Post
    }

    type Post @key(fields: "id") {
        id: ID!
        title: String!
        content: String!
        author: User! @provides(fields: "username")
    }

    extend type User @key(fields: "id") {
        id: ID! @external
        username: String! @external
        posts: [Post]
    }
`;

const resolvers = {
    Post: {
        __resolveReference: (post) => posts.find(p => p.id === post.id),
        author: (post) => users.find(u => u.id === post.author)
    },
    User: {
        posts: (user) => posts.filter(p => p.author === user.id)
    },
    Query: {
        posts: () => posts,
        post: (_, {id}) => posts.find(p => p.id === id)
    },
    Mutation: {
        createPost: (_, args) => {
            posts.push(args);
            return args;
        }
    }
};

let users = [
    {id: 1, username: "imhassane",  email: "imhassane@test.com",    password: "imhassane"},
    {id: 2, username: "imjannet",   email: "imjannet@test.com",     password: "imjannet"},
    {id: 3, username: "christophe", email: "christophe@test.com",   password: "christophe"},
    {id: 4, username: "malik",      email: "malik@test.com",        password: "malik"},
];

let posts = [
    {id: 1, title: "First post",  content: "Im the content of the first post",  author: 1},
    {id: 2, title: "Second post", content: "Im the content of the Second post", author: 2},
    {id: 3, title: "Third post",  content: "Im the content of the Third post",  author: 1},
    {id: 4, title: "Fourth post", content: "Im the content of the first post",  author: 3},
    {id: 5, title: "Fifth post",  content: "Im the content of the Fifth post",  author: 1}
];

const server = new ApolloServer({
    schema: buildFederatedSchema({
        typeDefs, resolvers
    })
});

module.exports = server;
