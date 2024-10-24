class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    addHead(value) {
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
    }

    printList() {
        let current = this.head;
        while(current !== null) {
            console.log(current.value);
            current = current.next;
        }
    }
}

const linkedList = new LinkedList();
linkedList.addHead(3);
linkedList.addHead(2);
linkedList.addHead(1);
linkedList.printList();