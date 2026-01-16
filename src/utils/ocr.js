import Tesseract from 'tesseract.js';

/**
 * Recognize text from a receipt image.
 * @param {File} imageFile - The image file to process.
 * @returns {Promise<{amount: number, date: string, merchant: string, text: string}>}
 */
export const recognizeReceipt = async (imageFile, onProgress = () => { }) => {
    try {
        const { data: { text } } = await Tesseract.recognize(
            imageFile,
            'chi_sim+eng', // Support Chinese and English
            {
                logger: m => {
                    console.log(m)
                    if (m.status === 'recognizing text') {
                        onProgress(m.progress)
                    }
                }
            }
        );

        console.log('OCR Text:', text);

        return parseReceiptText(text);
    } catch (error) {
        console.error('OCR Error:', error);
        throw new Error('识别失败，请重试');
    }
};

/**
 * Parse raw text to extract receipt details.
 * @param {string} text 
 */
const parseReceiptText = (text) => {
    const result = {
        amount: 0,
        date: null,
        merchant: '',
        text: text
    };

    const lines = text.split('\n').map(l => l.trim()).filter(l => l);

    // 1. Extract Amount
    // Look for currency symbols or "Total/合计" followed by numbers
    // Regex for money: (?:¥|￥|\$)?\s*(\d+(?:\.\d{2})?)
    // We prefer numbers that are likely totals (highest values or near "Total" keywords)

    let maxAmount = 0;
    const moneyRegex = /(?:¥|￥|\$|RMB|金额|合计|Total)\s*[:：]?\s*([1-9]\d*(?:\.\d{1,2})?)|(\d+\.\d{2})/gi;

    // Simple pass: find all numbers that look like money
    const numbers = [];
    let match;
    // Reset regex state if needed, or use matchAll
    // Using a simpler approach: extract all potential number strings

    lines.forEach(line => {
        // Try to find price-like patterns
        const priceMatches = line.matchAll(/([1-9]\d*\.\d{2})/g);
        for (const m of priceMatches) {
            numbers.push(parseFloat(m[1]));
        }

        // Keywords strategy
        if (/合计|Total|实付|Amount/i.test(line)) {
            const match = line.match(/(\d+\.\d{2})/);
            if (match) {
                result.amount = parseFloat(match[1]); // High confidence
            }
        }
    });

    if (result.amount === 0 && numbers.length > 0) {
        // If no keyword match, take the largest number (common heuristic)
        result.amount = Math.max(...numbers);
    }

    // 2. Extract Date
    // Patterns: YYYY-MM-DD, YYYY/MM/DD, YYYY年MM月DD日
    const dateRegex = /(\d{4})[-/年.](\d{1,2})[-/月.](\d{1,2})/;
    for (const line of lines) {
        const dateMatch = line.match(dateRegex);
        if (dateMatch) {
            // Normalize to ISO string or at least YYYY-MM-DD
            const year = dateMatch[1];
            const month = dateMatch[2].padStart(2, '0');
            const day = dateMatch[3].padStart(2, '0');
            result.date = `${year}-${month}-${day}`;
            break; // Assume first date found is the transaction date
        }
    }

    // 3. Extract Merchant (Basic)
    // Assume the first non-empty line that isn't a date or purely numbers is the merchant
    for (const line of lines) {
        if (line.length > 2 && !/\d{4}[-/年.]/.test(line) && isNaN(parseFloat(line))) {
            result.merchant = line;
            break;
        }
    }

    return result;
};
