import gql from "graphql-tag";

export const categoryTypeDefs = gql`
  type Category {
    id: ID!
    name: String!
    slug: String!
  }

  type Query {
    categories: [Category!]!
  }
`;