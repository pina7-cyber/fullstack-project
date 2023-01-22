import { gql } from "@apollo/client"

export const ALL_USERS = gql`
  query {
    allUsers {
      username
      id
    }
  }
`

export const ALL_TOPICS = gql`
  query AllTopics($category: String, $allTopicsId: ID, $keyword: String) {
    allTopics(category: $category, id: $allTopicsId, keyword: $keyword) {
      categories
      content
      comments
      keywords
      id
    }
  }
`
export const CREATE_TOPIC = gql`
  mutation AddTopic(
    $categories: [String!]!
    $content: String!
    $keywords: [String!]!
  ) {
    addTopic(categories: $categories, content: $content, keywords: $keywords) {
      categories
      content
      user {
        username
        id
      }
      comments
      keywords
      id
    }
  }
`
export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      username
      id
    }
  }
`

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
