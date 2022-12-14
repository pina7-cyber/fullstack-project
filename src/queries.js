import { gql } from "@apollo/client"

export const ALL_USERS = gql`
  query {
    allUsers {
      username
      id
      registered
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
  mutation createTopic(
    $categories: [String!]!
    $content: String!
    $keywords: [String!]!
  ) {
    addTopic(categories: $categories, content: $content, keywords: $keywords) {
      categories
      content
      comments
      keywords
      id
    }
  }
`
