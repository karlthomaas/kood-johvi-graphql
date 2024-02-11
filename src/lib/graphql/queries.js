import { gql } from 'graphql-request';
import Cookies from 'universal-cookie';
import { GraphQLClient } from 'graphql-request';

const graphQLClient = new GraphQLClient('https://01.kood.tech/api/graphql-engine/v1/graphql', {
  headers: () => ({
    Authorization: `Bearer ${new Cookies().get('token')}`,
  }),
});

export const fetchGraphQL = async (query) => await graphQLClient.request(query);

export const getUserInformation = gql/* GraphQL */ `
  query {
    user {
      id
      login
    }
  }
`;
