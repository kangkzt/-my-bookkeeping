const fs = require('fs');
const filePath = process.argv[2];
const startLine = parseInt(process.argv[3]);
const endLine = parseInt(process.argv[4]);

try {
    const content = fs.readFileSync(filePath, 'utf8');
    // Handle different newline formats if necessary, but split('\n') is usually safe enough for line counting
    const lines = content.split(/\r?\n/);

    if (startLine < 1 || endLine > lines.length || startLine > endLine) {
        console.error('Invalid line numbers');
        process.exit(1);
    }

    // splice removes elements. (start index, delete count)
    // lines are 1-indexed, array is 0-indexed.
    lines.splice(startLine - 1, endLine - startLine + 1);

    fs.writeFileSync(filePath, lines.join('\n'));
    console.log(`Deleted lines ${startLine} to ${endLine}`);
} catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
}
