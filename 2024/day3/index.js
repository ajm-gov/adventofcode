const fs = require('fs');

const inputText = fs.readFileSync("input.txt", 'utf8');

// Regex definitions. I don't like regex but I don't see how I could have done this differently.
const regexToFilterOutCleanMemory = /mul\((\d{1,3}),(\d{1,3})\)/g;
const doOperation = /do\(\)/;
const dontOperation = /don't\(\)/;

function calculateTotal(tokens, considerOperations = false) {
    let solutionTotal = 0;
    let mulEnabled = true;

    // considerOperations boolean for part two solution
    tokens.forEach(token => {
        if (considerOperations) {
            if (doOperation.test(token)) {
                mulEnabled = true;
            } else if (dontOperation.test(token)) {
                mulEnabled = false;
            } else if (mulEnabled) {
                solutionTotal += extractAndSumMul(token);
            }
        } else {
            solutionTotal += extractAndSumMul(token);
        }
    });

    return solutionTotal;
}

// Function to do all the calculations/multiplying stuff
function extractAndSumMul(token) {
    let total = 0;
    let match;
    while ((match = regexToFilterOutCleanMemory.exec(token)) !== null) {
        total += match[1] * match[2];
    }
    return total;
}

async function main() {
    const operationTokens = inputText.split(/(?=mul\(|do\(\)|don't\(\))/);

    const partOneTotal = calculateTotal(operationTokens, false);
    console.log("Part One Answer is", partOneTotal);

    const partTwoTotal = calculateTotal(operationTokens, true);
    console.log("Part Two Answer is", partTwoTotal);
}

main();