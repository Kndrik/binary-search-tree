export const Node = (data) => {
    return { 
        data: data,
        left : null,
        right: null,
        getHeight: function() {
            let rightHeight = 0;
            let leftHeight = 0;
            let currentNode = this;
            while(currentNode.right !== null) {
                currentNode = currentNode.right;
                rightHeight++;
            }

            currentNode = this;
            while(currentNode.left !== null) {
                currentNode = currentNode.left;
                leftHeight++;
            }

            return rightHeight > leftHeight ? rightHeight : leftHeight;
        }
    }
}