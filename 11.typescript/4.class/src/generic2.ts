class Box<T> {
    // private contents: T;

    // constructor(contents: T) {
    //     this.contents = contents;
    // }

    constructor(private contents: T) {}

    getContents(): T {
        return this.contents;
    }
}

const numberBox = new Box<number>(123);
console.log(numberBox.getContents());

const stringBox = new Box<string>("Hello");
console.log(stringBox.getContents());