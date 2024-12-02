const fs = require('fs');
const readline = require('readline');

const input = fs.createReadStream('input.txt', 'utf-8')

const rl = readline.createInterface({
    input: input,
    crlfDelay: Infinity
});

function isSafeReport(levels) {
    let isIncreasing = null;

    for (let i = 1; i < levels.length; i++) {
        const diff = levels[i] - levels[i - 1];

        // Check if differences is within range
        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            return false;
        }

        // Determine sequence direction
        if (isIncreasing === null) {
            isIncreasing = diff > 0;
        } else {
            // Check consistency of sequence direction
            if ((diff > 0 && !isIncreasing) || (diff < 0 && isIncreasing)) {
                return false;
            }
        }
    }

    return true
}

function isSafeReportWithRemoval(levels) {
    // If normal state is already safe, no need to go through additional loops
    if(isSafeReport(levels)) return true

    // Remove each level and check if that makes any difference
    for (let i = 0; i < levels.length; i++) {
        // Slice an element and run through isSafeReport to see if it works
        const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1));
        if (isSafeReport(modifiedLevels)) return true;
    }

    return false;
}

async function main () {
    let safeCount = 0;
    let safeCountPartTwo = 0
    for await (const line of rl) {
        if (line.trim()) {
            const levels = line.split(' ').map(Number);
            if (isSafeReport(levels)) {
                safeCount++;
            }
            if (isSafeReportWithRemoval(levels)) {
                safeCountPartTwo++;
            }
        }
    }

    console.log("Part one answer: ", safeCount);
    console.log("Part two answer: ", safeCountPartTwo)
}

main()