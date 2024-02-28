import { gql } from 'graphql-request';
import Cookies from 'universal-cookie';
import { GraphQLClient } from 'graphql-request';

export const graphQLClient = new GraphQLClient('https://01.kood.tech/api/graphql-engine/v1/graphql', {
  headers: () => ({
    Authorization: `Bearer ${new Cookies().get('token')}`,
  }),
});

export const fetchGraphQL = async (query, variables=null) => (
  await graphQLClient.request(query, variables)
);

export const getUserInformation = gql/* GraphQL */ `
  query User {
    user {
      id
      login
    }
  }
`;

export const getTransactions = gql/* GraphQL */ `
query Transaction($limit: Int, $order_by: [transaction_order_by]) {
  transaction(
    limit: $limit,
    order_by: $order_by,
    where: { type: {_eq: "xp"},
    path: {_like: "/johvi/div-01/%", _nlike: "%piscine-js%" }}){
      id
      userId
      objectId
      amount
      createdAt
      createdAt
      path
      object {
        name
        type
      }
  }
}
`

export const getProjects = gql/* GraphQL */ `
query getProjects {
	object (where: {type: {_eq: "project"}}) {
    id
    name
    type
    attrs
  }
}
`
export const getUserCompletedProjects = gql/* GraphQL */ `
query getUserCompletedProjects {
  progress (where: { grade: {_gte: 1}}){
    userId
    objectId
  }
}
`

export const getLatestTransactions = gql/* GraphQL */ `
query GetLatestTransactions($limit: Int!) {
  transaction(
    order_by: {createdAt: desc}
    limit:$limit
    where: {type: {_eq: "xp"} path: {_like: "/johvi/div-01/%", _nlike: "%piscine-js%" }}){
    amount
    object {
      name
      type
    }
  }
}
`

export const getUserAudits = gql/* GraphQL */ `
query GetUserAudits {
  user {
    auditRatio
    totalUp
    totalDown
  }
`