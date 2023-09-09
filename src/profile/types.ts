

export const AccountTypes = `#graphql

input QueryFilters {
    limit: Int = 30
    offset: Int = 0
}

# account
type Account {
    _id: String
    name: String
    email: String
    phone: String
    password: String
    avatar: String
    joinedOn: String
}

type AuthTokens {
    accessToken: String
    refreshToken: String
}

type AuthenticationResult {
    account: Account
    tokens: AuthTokens
}

input LoginInput {
    email: String!
    password: String!
}

input CreateAccountInput {
    name: String!
    email: String!
    phone: String!
    password: String!
    avatar: String
}





type Query {
    getAccounts(filters: QueryFilters): [Account]!
}

type Mutation {
    login(input: LoginInput!): AuthenticationResult
    createAccount(input: CreateAccountInput!): AuthenticationResult
}
`;
