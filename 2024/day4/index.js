const fs = require('fs');

const wordMatrix = fs.readFileSync('input.txt', 'utf8').trim();
const grid = wordMatrix.replace(/\r/g, '').split('\n').map(row => row.split(''));

const targetWord = "XMAS";
const directionsMap = [
    [0,1], // (Horizontal forward)
    [0, -1], // (Horizontal backward)
    [1, 0], // Vertical (down)
    [-1, 0], // Vertical (up)
    [1, 1], // Diagonal (down-right)
    [-1, -1], // Diagonal (up-left)
    [1, -1], // Diagonal (down-left)
    [-1, 1], // Diagonal (up-right)
];

function partOne(grid, targetWord) {
    const rows = grid.length;
    const cols = grid.at(0).length;
    let totalCount = 0;

    function isWordAtPostition(startRow, startCol, dirRow, dirCol) {
        for (let i = 0; i < targetWord.length; i++) {
            const newRow = startRow + i * dirRow;
            const newCol = startCol + i * dirCol;
            if (
                newRow < 0 || newRow >= rows || // Checks for row boundaries
                newCol < 0 || newCol >= cols || // Checls for column boundaries
                grid[newRow][newCol] !== targetWord[i] // Check if characters match
            ) {
                return false;
            }
        } return true
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            for (const [dirRow, dirCol] of directionsMap) {
                if (isWordAtPostition(row, col, dirRow, dirCol)) {
                    totalCount++;
                }
            }
        }
    }

    console.log("Part one solution is ", totalCount);
}

function partTwo(grid) {
    let totalCount = 0;
    const rows = grid.length;
    const cols = grid.at(0).length;

    // Loop through grid to assess the X shape of each letter that is within the X boundaries
    for (let row = 1; row < rows - 1; row++) {
        for (let col = 1; col < cols - 1; col++) {
            // Form a string based on the "X" shape for the current row,col position
            const xGridString = grid[row - 1][col - 1] + grid[row][col] + grid[row + 1][col + 1] + grid[row - 1][col + 1] + grid[row][col] + grid[row + 1][col - 1];

            // These strings will form an acceptable X grid
            const acceptableXGrids = ["SAMSAM", "SAMMAS", "MASSAM", "MASMAS"]

            if (acceptableXGrids.includes(xGridString)) {
                totalCount++;
            }
        }
    }

    console.log("Part two solution is ", totalCount);
}

partOne(grid, targetWord);
partTwo(grid);