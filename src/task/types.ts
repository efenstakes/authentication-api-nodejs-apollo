

export const TaskTypes = `#graphql

input QueryFilters {
    limit: Int = 30
    offset: Int = 0
}

type Task {
    title: String!
    description: String!

    accountId: String!

    account: Account
}

input AddTaskInput {
    title: String!
    description: String!
}



type Query {
    getTasks(filters: QueryFilters): [Task]!
}

type Mutation {
    addTask(input: AddTaskInput!): Task
}
`;
