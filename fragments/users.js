import { gql } from '@apollo/client'
import { COMMENT_FIELDS } from './comments'
import { ITEM_FIELDS, ITEM_WITH_COMMENTS } from './items'

export const ME = gql`
  {
    me {
      id
      name
      sats
      stacked
      freePosts
      freeComments
      hasNewNotes
      tipDefault
      bioId
      hasInvites
      upvotePopover
      tipPopover
      noteItemSats
      noteEarning
      noteAllDescendants
      noteMentions
      noteDeposits
      noteInvites
      noteJobIndicator
      hideInvoiceDesc
      wildWestMode
      greeterMode
      lastCheckedJobs
    }
  }`

export const ME_SSR = gql`
  {
    me {
      id
      name
      sats
      stacked
      freePosts
      freeComments
      tipDefault
      bioId
      upvotePopover
      tipPopover
      noteItemSats
      noteEarning
      noteAllDescendants
      noteMentions
      noteDeposits
      noteInvites
      noteJobIndicator
      hideInvoiceDesc
      wildWestMode
      greeterMode
      lastCheckedJobs
    }
  }`

export const SETTINGS_FIELDS = gql`
  fragment SettingsFields on User {
    tipDefault
    noteItemSats
    noteEarning
    noteAllDescendants
    noteMentions
    noteDeposits
    noteInvites
    noteJobIndicator
    hideInvoiceDesc
    wildWestMode
    greeterMode
    authMethods {
      lightning
      email
      twitter
      github
    }
  }`

export const SETTINGS = gql`
${SETTINGS_FIELDS}
{
  settings {
    ...SettingsFields
  }
}`

export const SET_SETTINGS =
gql`
${SETTINGS_FIELDS}
mutation setSettings($tipDefault: Int!, $noteItemSats: Boolean!, $noteEarning: Boolean!,
  $noteAllDescendants: Boolean!, $noteMentions: Boolean!, $noteDeposits: Boolean!,
  $noteInvites: Boolean!, $noteJobIndicator: Boolean!, $hideInvoiceDesc: Boolean!,
  $wildWestMode: Boolean!, $greeterMode: Boolean!) {
  setSettings(tipDefault: $tipDefault, noteItemSats: $noteItemSats,
    noteEarning: $noteEarning, noteAllDescendants: $noteAllDescendants,
    noteMentions: $noteMentions, noteDeposits: $noteDeposits, noteInvites: $noteInvites,
    noteJobIndicator: $noteJobIndicator, hideInvoiceDesc: $hideInvoiceDesc, wildWestMode: $wildWestMode,
    greeterMode: $greeterMode) {
      ...SettingsFields
    }
  }
`

export const NAME_QUERY =
gql`
  query nameAvailable($name: String!) {
    nameAvailable(name: $name)
  }
`

export const NAME_MUTATION =
gql`
  mutation setName($name: String!) {
    setName(name: $name)
  }
`

export const USER_SEARCH =
gql`
  query searchUsers($name: String!) {
    searchUsers(name: $name) {
      name
    }
  }`

export const USER_FIELDS = gql`
  ${ITEM_FIELDS}
  fragment UserFields on User {
    id
    createdAt
    name
    nitems
    ncomments
    stacked
    sats
    photoId
    bio {
      ...ItemFields
      text
    }
  }`

export const TOP_USERS = gql`
  query TopUsers($cursor: String, $within: String!, $userType: String!) {
    topUsers(cursor: $cursor, within: $within, userType: $userType) {
      users {
        name
        amount
      }
      cursor
    }
  }
`

export const USER_FULL = gql`
  ${USER_FIELDS}
  ${ITEM_WITH_COMMENTS}
  query User($name: String!) {
    user(name: $name) {
      ...UserFields
      bio {
        ...ItemWithComments
      }
  }
}`

export const USER_WITH_COMMENTS = gql`
  ${USER_FIELDS}
  ${COMMENT_FIELDS}
  query UserWithComments($name: String!) {
    user(name: $name) {
      ...UserFields
    }
    moreFlatComments(sort: "user", name: $name) {
      cursor
      comments {
        ...CommentFields
      }
    }
  }`

export const USER_WITH_POSTS = gql`
  ${USER_FIELDS}
  ${ITEM_FIELDS}
  query UserWithPosts($name: String!) {
    user(name: $name) {
      ...UserFields
    }
    items(sort: "user", name: $name) {
      cursor
      items {
        ...ItemFields
        position
      }
      pins {
        ...ItemFields
         position
      }
    }
  }`
