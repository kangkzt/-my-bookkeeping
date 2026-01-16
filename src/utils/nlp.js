/**
 * Parse natural language text into transaction details.
 * @param {string} text - The spoken text (e.g., "Lunch 30 yuan", "Alipay 50 for taxi").
 * @param {Array} categories - List of available categories.
 * @param {Array} accounts - List of available accounts.
 * @returns {Object} { amount, date, categoryId, accountId, remark }
 */
export const parseVoiceInput = (text, categories, accounts) => {
    const result = {
        amount: null,
        date: null,
        categoryId: null,
        accountId: null,
        remark: text
    };

    if (!text) return result;

    // 1. Extract Amount
    // Matches: numbers, potentially with units like 元, 块, etc.
    // Heuristic: The last number in the sentence is often the amount, or a number followed by currency keywords.
    const amountRegex = /(\d+(?:\.\d{1,2})?)\s*(?:元|块|钱|yuan)?/gi;
    let amountMatch;
    const amounts = [];
    while ((amountMatch = amountRegex.exec(text)) !== null) {
        amounts.push(parseFloat(amountMatch[1]));
    }
    if (amounts.length > 0) {
        // Assume the last stated number is the amount usually, or the largest? 
        // Simple logic: Use the largest number found that is reasonable (or just the first one if unsure)
        // Let's take the *last* one as users often say "Lunch at kfc 30"
        result.amount = amounts[amounts.length - 1];
    }

    // 2. Extract Date (Keywords)
    const today = new Date();
    if (text.includes('昨天') || text.includes('yesterday')) {
        const d = new Date(today);
        d.setDate(d.getDate() - 1);
        result.date = d.toISOString().split('T')[0];
    } else if (text.includes('前天')) {
        const d = new Date(today);
        d.setDate(d.getDate() - 2);
        result.date = d.toISOString().split('T')[0];
    } else {
        // Default to today (handled by UI usually, but explicit here if 'today' is said)
        if (text.includes('今天') || text.includes('today')) {
            result.date = today.toISOString().split('T')[0];
        }
    }

    // 3. Match Category
    // Simple fuzzy match: check if category name is in the text
    let bestCat = null;
    let maxCatLen = 0;
    for (const cat of categories) {
        if (text.includes(cat.name)) {
            if (cat.name.length > maxCatLen) {
                maxCatLen = cat.name.length;
                bestCat = cat.id;
            }
        }
    }
    result.categoryId = bestCat;

    // 4. Match Account
    let bestAcc = null;
    let maxAccLen = 0;
    for (const acc of accounts) {
        if (text.includes(acc.name)) {
            if (acc.name.length > maxAccLen) {
                maxAccLen = acc.name.length;
                bestAcc = acc.id;
            }
        }
    }
    result.accountId = bestAcc;

    return result;
};
