import { gql } from 'graphql-request';
import Cookies from 'universal-cookie';
import { GraphQLClient } from 'graphql-request';

export const graphQLClient = new GraphQLClient('https://01.kood.tech/api/graphql-engine/v1/graphql', {
  headers: () => ({
    Authorization: `Bearer ${new Cookies().get('token')}`,
  }),
});

export const fetchGraphQL = async (query) => await graphQLClient.request(query);

export const getUserInformation = gql/* GraphQL */ `
  query User {
    user {
      id
      login
    }
  }
`;

export const getTransactions = gql/* GraphQL */ `
query Transaction{
  transaction(order_by: {createdAt: asc}, where: { type: {_eq: "xp"} path: {_like: "/johvi/div-01/%", _nlike: "%piscine-js%" }}) {
    id
    userId
    objectId
    amount
		createdAt
    createdAt
    path
  }
}
`
