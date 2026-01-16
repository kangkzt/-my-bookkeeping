export const transactionSchema = {
    title: 'transaction schema',
    version: 1,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100
        },
        amount: {
            type: 'number'
        },
        type: {
            type: 'string', // 'expense', 'income', etc.
            maxLength: 50
        },
        date: {
            type: 'string', // ISO string
            format: 'date-time',
            maxLength: 40
        },
        categoryId: {
            type: 'string',
            maxLength: 100
        },
        accountId: {
            type: 'string',
            maxLength: 100
        },
        description: {
            type: 'string'
        },
        projectId: {
            type: 'string',
            maxLength: 100
        },
        merchant: {
            type: 'string'
        },
        // Sync fields
        updatedAt: {
            type: 'number',
            minimum: 0,
            maximum: 10000000000000,
            multipleOf: 1
        },
        isDeleted: {
            type: 'number',
            minimum: 0,
            maximum: 1
        }
    },
    required: ['id', 'amount', 'type', 'date', 'updatedAt', 'categoryId', 'accountId'],
    indexes: ['date', 'type', 'categoryId', 'accountId', 'updatedAt']
}

export const accountSchema = {
    title: 'account schema',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100
        },
        name: {
            type: 'string'
        },
        type: {
            type: 'string'
        },
        balance: {
            type: 'number'
        },
        color: {
            type: 'string'
        },
        icon: {
            type: 'string'
        },
        updatedAt: {
            type: 'number'
        },
        isDeleted: {
            type: 'number',
            minimum: 0,
            maximum: 1
        }
    },
    required: ['id', 'name', 'type', 'updatedAt']
}

export const categorySchema = {
    title: 'category schema',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100
        },
        name: {
            type: 'string'
        },
        type: {
            type: 'string'
        },
        icon: {
            type: 'string'
        },
        color: {
            type: 'string'
        },
        group: { // optional group for default categories
            type: 'string'
        },
        updatedAt: {
            type: 'number'
        },
        isDeleted: {
            type: 'number',
            minimum: 0,
            maximum: 1
        }
    },
    required: ['id', 'name', 'type', 'updatedAt']
}

export const tagSchema = {
    title: 'tag schema',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100
        },
        name: {
            type: 'string'
        },
        color: {
            type: 'string'
        },
        updatedAt: {
            type: 'number'
        },
        isDeleted: {
            type: 'number',
            minimum: 0,
            maximum: 1
        }
    },
    required: ['id', 'name', 'updatedAt']
}

export const personSchema = {
    title: 'person schema',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100
        },
        name: {
            type: 'string'
        },
        avatar: {
            type: 'string'
        },
        updatedAt: {
            type: 'number'
        },
        isDeleted: {
            type: 'number',
            minimum: 0,
            maximum: 1
        }
    },
    required: ['id', 'name', 'updatedAt']
}

export const photoSchema = {
    title: 'photo schema',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100
        },
        transactionId: {
            type: 'string',
            maxLength: 100
        },
        updatedAt: {
            type: 'number'
        },
        isDeleted: {
            type: 'number',
            minimum: 0,
            maximum: 1
        }
    },
    required: ['id', 'transactionId', 'updatedAt'],
    additionalProperties: true
}
