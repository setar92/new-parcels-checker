function findMissingNumbers(array1, array2) {
    const missingNumbers = [];

    const set2 = new Set(array2);

    for (let number of array1) {
        if (!set2.has(number)) {
            missingNumbers.push(number);
        }
    }

    return missingNumbers;
}

module.exports = {findMissingNumbers};