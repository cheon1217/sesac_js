// Person에 대한 인터페이스 정의 (데이터 속성과 타입)
interface Human {
    name: string;
    age: number;
    isEmployed: boolean;
}

const alice: Human = {
    name: 'Alice',
    age: 30,
    isEmployed: true
};

console.log(`Name: ${alice.name}, Age: ${alice.age}`);

interface Product {
    readonly id: number;
    name: string;
    price?: number;
}

const laptop: Product = {
    id: 1,
    name: 'Lenovo',
    // price: 1000000
};

console.log(`상품 ID: ${laptop.id}, 상품명: ${laptop.name}, 가격: ${laptop.price}`);
laptop.name = "Lenovo A5";
laptop.price = 2000000;

console.log(`상품 ID: ${laptop.id}, 상품명: ${laptop.name}, 가격: ${laptop.price}`);
// laptop.id = 2;