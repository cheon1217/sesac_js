const Parent = require("./Parent");
const Child = require("./Child");
const Sedan = require("./Sedan");
const Suv = require("./Suv");

const dad = new Parent("철수", 45, "남성", "아빠");
const daughter = new Child("지연", 10, "여성", "3학년");
const son = new Child("민수", 8, "남성", "1학년");

const familyCar = new Sedan("현대", "그랜저", "검정", 3000);
const familyCar2 = new Suv("기아", "k5", "빨강", 5000);

familyCar.start();
dad.getInCar(familyCar);
dad.diveCar(familyCar);
daughter.getInCar(familyCar2);
son.getInCar(familyCar);
daughter.playInCar(familyCar2);
son.playInCar(familyCar);
familyCar.stop();