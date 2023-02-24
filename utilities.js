export const mergeSort = (toSort) => {
    // If the array contains only one value, it is considered sorted.
    if (toSort.length < 2) return toSort;

    // Sort left and right array
    const midValue = Math.floor(toSort.length / 2);
    const leftArray = mergeSort(toSort.slice(0, midValue));
    const rightArray = mergeSort(toSort.slice(midValue));

    // Merge left and right arrays
    let sortedArray = [];
    while (leftArray.length > 0 && rightArray.length > 0) {
        const minArray = leftArray[0] < rightArray[0] ? leftArray : rightArray;
        const minElem = minArray.shift();
        sortedArray.push(minElem);
    }
    return sortedArray.concat(leftArray, rightArray);
}

export const lowestData = (root) => {
    while (root.left !== null) {
        root = root.left;
    }
    return root.data;
}

export const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

export const removeDuplicates = (array) => {
    let parsedArray = [];
    array.forEach(element => {
        if (!parsedArray.includes(element)) {
            parsedArray.push(element);
        }
    });
    return parsedArray;
}