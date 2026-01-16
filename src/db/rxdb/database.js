import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { RxDBMigrationSchemaPlugin } from 'rxdb/plugins/migration-schema';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
import {
    transactionSchema,
    accountSchema,
    categorySchema,
    tagSchema,
    personSchema,
    photoSchema
} from './schemas';

// Enable Dev Mode in development
const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
    addRxPlugin(RxDBDevModePlugin);
}

addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBMigrationSchemaPlugin);

let dbPromise = null;

const createDatabase = async () => {
    let storage = getRxStorageDexie();

    if (isDev) {
        storage = wrappedValidateAjvStorage({
            storage
        });
    }

    const db = await createRxDatabase({
        name: 'scarlet_cosmos_rxdb',
        storage
    });

    await db.addCollections({
        transactions: {
            schema: transactionSchema,
            migrationStrategies: {
                1: function (doc) {
                    return doc;
                }
            }
        },
        accounts: { schema: accountSchema },
        categories: { schema: categorySchema },
        tags: { schema: tagSchema },
        persons: { schema: personSchema },
        photos: { schema: photoSchema }
    });

    return db;
};

export const getRxDB = () => {
    if (!dbPromise) {
        dbPromise = createDatabase();
    }
    return dbPromise;
};
