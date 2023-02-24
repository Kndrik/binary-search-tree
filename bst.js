import { mergeSort, lowestData, prettyPrint } from "./utilities.js";
import { Node } from "./node.js";

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        let parsedArray = [];
        array.forEach(element => {
            if (!parsedArray.includes(element)) {
                parsedArray.push(element);
            }
        });
        parsedArray = mergeSort(parsedArray);
        return this.#buildTreeRec(parsedArray, 0, parsedArray.length-1);
    }

    #buildTreeRec(array, start, end) {
        if (start > end) return null;

        const midIndex = parseInt((start + end) / 2);
        const node = Node(array[midIndex]);

        node.left = this.#buildTreeRec(array, start, midIndex - 1);
        node.right = this.#buildTreeRec(array, midIndex + 1, end);

        return node;
    }

    insert(data) {
        let child = this.root;
        while (true) {
            if (data > child.data) {
                if (child.right === null) {
                    child.right = Node(data);
                    break;
                }
                child = child.right;
            } else {
                if (child.left === null) {
                    child.left = Node(data);
                    break;
                }
                child = child.left;
            }
        }
    }

    delete(data) {
        this.root = this.#deleteRec(this.root, data);
    }

    #deleteRec(root, data) {
        // if root is null, return it
        if (root === null) return root;
        // if the data is greater than the root value, recursive on the right
        if (data > root.data) {
            root.right = this.#deleteRec(root.right, data);
        } 
        // if the data is lower than the root value, recursive on the left
        else if (data < root.data) {
            root.left = this.#deleteRec(root.left, data)
        }
        // if the data is same
        else {
            // if the node have 1 or 0 children, return pontential child
            if (root.left == null) {
                return root.right;
            } else if (root.right == null) {
                return root.left;
            }
            // if the node has 2 children, replace value with lowest in right subtree and delete the lowest
            root.data = lowestData(root.right);
            root.right = this.#deleteRec(root.right, root.data);
        }
        return root;
    }

    queue = new Array();

    levelOrder(func) {
        let array = [];
        if (func === undefined)
            func = (node) => { array.push(node.data) };

        this.queue.push(this.root);
        while(this.queue.length !== 0) {
            const node = this.queue.shift();
            func(node);
            if (node.left !== null) this.queue.push(node.left);
            if (node.right !== null) this.queue.push(node.right);
        }
        return array;
    }

    inorder(func, node = this.root) {
        let array = [];
        if (func === undefined)
            func = (_node) => { array.push(_node.data) };

        if (node.left !== null) this.inorder(func, node.left);
        func(node);
        if (node.right !== null) this.inorder(func, node.right);

        return array;
    }
}

const myTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(myTree.root);
console.log(' ');
console.log(' ');
console.log(' ');
myTree.inorder(node => console.log(node.data));