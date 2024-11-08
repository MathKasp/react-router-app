import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getExpenses(query) {
    await fakeNetwork(`getExpenses:${query}`);
    let expenses = await localforage.getItem("expenses");
    if (!expenses) expenses = [];
    if (query) {
        expenses = matchSorter(expenses, query, { keys: ["first", "last"] });
    }
    return expenses.sort(sortBy("last", "createdAt"));
}

export async function createExpense() {
    await fakeNetwork();
    let id = Math.random().toString(36).substring(2, 9);
    let expense = { id, createdAt: Date.now() };
    let expenses = await getExpenses();
    expenses.unshift(expense);
    await set(expenses);
    return expense;
}

export async function getExpense(id) {
    await fakeNetwork(`expense:${id}`);
    let expenses = await localforage.getItem("expenses");
    let expense = expenses.find(expense => expense.id === id);
    return expense ?? null;
}

export async function updateExpense(id, updates) {
    await fakeNetwork();
    let expenses = await localforage.getItem("expenses");
    let expense = expenses.find(expense => expense.id === id);
    if (!expense) throw new Error("No expense found for", id);
    Object.assign(expense, updates);
    await set(expenses);
    return expense;
}

export async function deleteExpense(id) {
    let expenses = await localforage.getItem("expenses");
    let index = expenses.findIndex(expense => expense.id === id);
    if (index > -1) {
        expenses.splice(index, 1);
        await set(expenses);
        return true;
    }
    return false;
}

function set(expenses) {
    return localforage.setItem("expenses", expenses);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
    if (!key) {
        fakeCache = {};
    }

    if (fakeCache[key]) {
        return;
    }

    fakeCache[key] = true;
    return new Promise(res => {
        setTimeout(res, Math.random() * 800);
    });
}