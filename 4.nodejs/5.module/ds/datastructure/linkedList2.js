class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.previous = null;
    }
}

class DoubleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    addToHead(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.previous = newNode;
            this.head = newNode;
        }
    }

    addToTail(value) {
        const newNode = new Node(value);
        if (!this.tail) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.previous = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    printForward() {
        let current = this.head;
        while(current !== null) {
            console.log(current.value);
            current = current.next;
        }
    }

    printBackward() {
        let current = this.tail;
        while(current !== null) {
            console.log(current.value);
            current = current.previous;
        }
    }
}

const doubleList = new DoubleLinkedList();
doubleList.addToHead(3);
doubleList.addToHead(2);
doubleList.addToHead(1);

console.log("Forward:");
doubleList.printForward();

console.log("Backward");
doubleList.printBackward();