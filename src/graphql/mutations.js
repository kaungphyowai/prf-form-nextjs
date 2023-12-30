/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createApp = /* GraphQL */ `
  mutation CreateApp(
    $input: CreateAppInput!
    $condition: ModelAppConditionInput
  ) {
    createApp(input: $input, condition: $condition) {
      id
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateApp = /* GraphQL */ `
  mutation UpdateApp(
    $input: UpdateAppInput!
    $condition: ModelAppConditionInput
  ) {
    updateApp(input: $input, condition: $condition) {
      id
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteApp = /* GraphQL */ `
  mutation DeleteApp(
    $input: DeleteAppInput!
    $condition: ModelAppConditionInput
  ) {
    deleteApp(input: $input, condition: $condition) {
      id
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
