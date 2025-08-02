import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    category: String!
  }

  input UpdateProductInput {
    id: ID!
    name: String
    price: Float
    category: String
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }

  type Mutation {
    addProduct(name: String!, price: Float!, category: String!): Product!
    updateProduct(input: UpdateProductInput!): Product
    deleteProduct(id: ID!): Boolean!
  }
`;
