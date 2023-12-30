/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getApp = /* GraphQL */ `
  query GetApp($id: ID!) {
    getApp(id: $id) {
      id
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listApps = /* GraphQL */ `
  query ListApps(
    $filter: ModelAppFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApps(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        status
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
