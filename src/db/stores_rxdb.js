import { getRxDB } from './rxdb/database';
import { v4 as uuidv4 } from 'uuid'; // We need a UUID generator, using a simple one or installing 'uuid'

// Simple UUID generator if 'uuid' package not installed (we didn't install it explicitly, but let's see if we can use a helper)
// Actually 'box.js' might not have uuid. Let's use crypto.randomUUID if available or a polyfill.
const genId = () => crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);

// Helper to convert RxDocument to plain JSON
const toJSON = (doc) => doc ? doc.toJSON() : null;

// ==================== Transactions ====================

export async function getAllTransactions() {
    const db = await getRxDB();
    const docs = await db.transactions.find({
        selector: { isDeleted: { $ne: 1 } },
        sort: [{ date: 'desc' }]
    }).exec();
    return docs.map(toJSON);
}

export async function addTransaction(transaction) {
    const db = await getRxDB();
    const id = transaction.id || genId();
    const data = {
        ...transaction,
        id,
        updatedAt: transaction.updatedAt || Date.now(),
        isDeleted: transaction.isDeleted || 0
    };
    try {
        await db.transactions.insert(data);
    } catch (e) {
        // If it exists (e.g. restore), try update or ignore?
        // restore usually wipes first. If not wiping, insert might fail on conflict.
        // RxDB insert throws on conflict. upsert() might be better for import?
        // Let's stick to insert for now, assuming clearAllData is called or IDs are new.
        // Or better: atomicUpsert
        await db.transactions.upsert(data);
    }

    // Update Balance Logic (Copied/Adapted from stores.js)
    await updateAccountBalanceForTransaction(data);

    return data;
}

export async function updateTransaction(id, data) {
    const db = await getRxDB();
    const doc = await db.transactions.findOne(id).exec();
    if (!doc) throw new Error('Transaction not found');

    const oldData = doc.toJSON();
    await updateAccountBalanceForTransaction(oldData, true); // Revert

    const newData = { ...data, updatedAt: Date.now() };
    await doc.update({ $set: newData });

    await updateAccountBalanceForTransaction({ ...oldData, ...newData }, false); // Apply
    return { ...oldData, ...newData };
}

export async function deleteTransaction(id) {
    const db = await getRxDB();
    const doc = await db.transactions.findOne(id).exec();
    if (doc) {
        const data = doc.toJSON();
        await updateAccountBalanceForTransaction(data, true); // Revert
        await doc.update({ $set: { isDeleted: 1, updatedAt: Date.now() } });
    }
}

export async function deleteTransactions(ids) {
    const db = await getRxDB();
    const docs = await db.transactions.find({
        selector: {
            id: { $in: ids }
        }
    }).exec();

    for (const doc of docs) {
        const data = doc.toJSON();
        await updateAccountBalanceForTransaction(data, true); // Revert
        await doc.update({ $set: { isDeleted: 1, updatedAt: Date.now() } });
    }
}

export async function updateTransactions(updates) {
    const db = await getRxDB();
    for (const update of updates) {
        if (!update.id) continue;
        const doc = await db.transactions.findOne(update.id).exec();
        if (doc) {
            const oldData = doc.toJSON();
            const newData = { ...update, updatedAt: Date.now() };
            // Revert and Apply balance logic to ensure consistency
            await updateAccountBalanceForTransaction(oldData, true);
            await doc.update({ $set: newData });
            await updateAccountBalanceForTransaction({ ...oldData, ...newData }, false);
        }
    }
}

// Logic for Account Balance Update (Adapted for RxDB)
async function updateAccountBalanceForTransaction(transaction, isReversal = false) {
    const db = await getRxDB();
    const multiplier = isReversal ? -1 : 1;
    const amount = Number(transaction.amount) * multiplier;

    if (!transaction.accountId) return;

    if (transaction.type === 'expense' || transaction.type === 'debt_out') {
        const account = await db.accounts.findOne(transaction.accountId).exec();
        if (account) {
            await account.update({ $inc: { balance: -amount } }); // RxDB atomic increment is cleaner!
            // Wait, RxDB $inc support depends on plugin? 'update' plugin supports mongo operators.
            // Let's assume standard mongo style update via atomicUpdate or update({$inc})
            // Default 'update' plugin supports simple set.
            // Safe way: atomicUpdate
            await account.atomicUpdate(old => {
                return { ...old, balance: (old.balance || 0) - amount };
            });
        }
    } else if (transaction.type === 'income' || transaction.type === 'debt_in') {
        const account = await db.accounts.findOne(transaction.accountId).exec();
        if (account) {
            await account.atomicUpdate(old => {
                return { ...old, balance: (old.balance || 0) + amount };
            });
        }
    } else if (transaction.type === 'transfer') {
        const fromAccount = await db.accounts.findOne(transaction.accountId).exec();
        if (fromAccount) {
            await fromAccount.atomicUpdate(old => {
                return { ...old, balance: (old.balance || 0) - amount };
            });
        }
        if (transaction.toAccountId) {
            const toAccount = await db.accounts.findOne(transaction.toAccountId).exec();
            if (toAccount) {
                await toAccount.atomicUpdate(old => {
                    return { ...old, balance: (old.balance || 0) + amount };
                });
            }
        }
    }
}

export async function getTransactionsByDateRange(startDate, endDate) {
    const db = await getRxDB();
    const docs = await db.transactions.find({
        selector: {
            isDeleted: { $ne: 1 },
            date: { $gte: new Date(startDate).toISOString(), $lte: new Date(endDate).toISOString() }
        },
        sort: [{ date: 'desc' }]
    }).exec();
    return docs.map(toJSON);
}

export async function getTransactionsByMonth(year, month) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);
    return getTransactionsByDateRange(startDate, endDate);
}

export async function getTransactionsByYear(year) {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59);
    return getTransactionsByDateRange(startDate, endDate);
}

export async function getTransactionById(id) {
    const db = await getRxDB();
    const doc = await db.transactions.findOne(id).exec();
    return toJSON(doc);
}


// ==================== Accounts ====================

export async function getAllAccounts() {
    const db = await getRxDB();
    const docs = await db.accounts.find({ selector: { isDeleted: { $ne: 1 } } }).exec();
    return docs.map(toJSON);
}

export async function addAccount(account) {
    const db = await getRxDB();
    const id = account.id || genId();
    const data = { ...account, id, updatedAt: account.updatedAt || Date.now(), isDeleted: account.isDeleted || 0 };
    await db.accounts.upsert(data);
    return data;
}

export async function updateAccount(id, data) {
    const db = await getRxDB();
    const doc = await db.accounts.findOne(id).exec();
    if (doc) {
        await doc.update({ $set: { ...data, updatedAt: Date.now() } });
        return { ...doc.toJSON(), ...data };
    }
}

export async function deleteAccount(id) {
    const db = await getRxDB();
    const doc = await db.accounts.findOne(id).exec();
    if (doc) {
        await doc.update({ $set: { isDeleted: 1, updatedAt: Date.now() } });
    }
}

// ==================== Categories ====================

export async function getAllCategories() {
    const db = await getRxDB();
    const docs = await db.categories.find({ selector: { isDeleted: { $ne: 1 } } }).exec();
    return docs.map(toJSON);
}

export async function getCategoriesByType(type) {
    const db = await getRxDB();
    const docs = await db.categories.find({ selector: { type, isDeleted: { $ne: 1 } } }).exec();
    return docs.map(toJSON);
}

export async function addCategory(category) {
    const db = await getRxDB();
    const id = category.id || genId();
    const data = { ...category, id, updatedAt: category.updatedAt || Date.now(), isDeleted: category.isDeleted || 0 };
    await db.categories.upsert(data);
    return data;
}

export async function updateCategory(id, data) {
    const db = await getRxDB();
    const doc = await db.categories.findOne(id).exec();
    if (doc) await doc.update({ $set: { ...data, updatedAt: Date.now() } });
}

export async function deleteCategory(id) {
    const db = await getRxDB();
    const doc = await db.categories.findOne(id).exec();
    if (doc) await doc.update({ $set: { isDeleted: 1, updatedAt: Date.now() } });
}

// ==================== Tags ====================
// Implementing similar pattern for Tags
export async function getAllTags() {
    const db = await getRxDB();
    return (await db.tags.find({ selector: { isDeleted: { $ne: 1 } } }).exec()).map(toJSON);
}
export async function addTag(tag) {
    const db = await getRxDB();
    const id = tag.id || genId();
    const data = { ...tag, id, updatedAt: tag.updatedAt || Date.now(), isDeleted: tag.isDeleted || 0 };
    await db.tags.upsert(data);
    return data;
}
export async function updateTag(id, data) {
    const db = await getRxDB();
    const doc = await db.tags.findOne(id).exec();
    if (doc) await doc.update({ $set: { ...data, updatedAt: Date.now() } });
}
export async function deleteTag(id) {
    const db = await getRxDB();
    const doc = await db.tags.findOne(id).exec();
    if (doc) await doc.update({ $set: { isDeleted: 1, updatedAt: Date.now() } });
}


// ==================== Persons ====================
export async function getAllPersons() {
    const db = await getRxDB();
    return (await db.persons.find({ selector: { isDeleted: { $ne: 1 } } }).exec()).map(toJSON);
}
export async function addPerson(person) {
    const db = await getRxDB();
    const id = person.id || genId();
    const data = { ...person, id, updatedAt: person.updatedAt || Date.now(), isDeleted: person.isDeleted || 0 };
    await db.persons.upsert(data);
    return data;
}
export async function updatePerson(id, data) {
    const db = await getRxDB();
    const doc = await db.persons.findOne(id).exec();
    if (doc) await doc.update({ $set: { ...data, updatedAt: Date.now() } });
}
export async function deletePerson(id) {
    const db = await getRxDB();
    const doc = await db.persons.findOne(id).exec();
    if (doc) await doc.update({ $set: { isDeleted: 1, updatedAt: Date.now() } });
}

// ==================== Photos ====================
export async function addPhoto(photo) {
    const db = await getRxDB();
    const id = photo.id || genId();
    const data = { ...photo, id, updatedAt: photo.updatedAt || Date.now(), isDeleted: photo.isDeleted || 0 };
    await db.photos.upsert(data);
    return data;
}

export async function deletePhoto(id) {
    const db = await getRxDB();
    const doc = await db.photos.findOne(id).exec();
    if (doc) await doc.update({ $set: { isDeleted: 1, updatedAt: Date.now() } });
}

export async function getPhotosByTransactionId(tid) {
    const db = await getRxDB();
    const docs = await db.photos.find({
        selector: {
            transactionId: tid,
            isDeleted: { $ne: 1 }
        }
    }).exec();
    return docs.map(toJSON);
}

// ==================== Stats Helpers ====================

export async function getMonthlyStats(year, month) {
    const transactions = await getTransactionsByMonth(year, month);
    let income = 0;
    let expense = 0;
    transactions.forEach(t => {
        const amt = Number(t.amount);
        if (t.type === 'income') income += amt;
        else if (t.type === 'expense') expense += amt;
    });
    return {
        income,
        expense,
        balance: income - expense
    };
}

export async function getCategoryStats(year, month, type) {
    const transactions = await getTransactionsByMonth(year, month);
    const filtered = transactions.filter(t => t.type === type);

    // Group by categoryId
    const map = {};
    for (const t of filtered) {
        if (!map[t.categoryId]) map[t.categoryId] = 0;
        map[t.categoryId] += Number(t.amount);
    }

    // Enrich with category info
    const categories = await getAllCategories();
    const catMap = new Map(categories.map(c => [c.id, c]));

    const result = Object.entries(map).map(([catId, amount]) => {
        const cat = catMap.get(catId);
        return {
            categoryId: catId,
            amount,
            name: cat ? cat.name : 'Unknown',
            color: cat ? cat.color : '#ccc',
            icon: cat ? cat.icon : '?'
        };
    });

    return result.sort((a, b) => b.amount - a.amount);
}

export async function clearAllData() {
    const db = await getRxDB();
    await Promise.all([
        db.transactions.find().remove(),
        db.photos.find().remove(),
        db.accounts.find().remove(),
        db.categories.find().remove(),
        db.tags.find().remove(),
        db.persons.find().remove()
    ]);
}


