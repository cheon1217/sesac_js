const Employee = require("./Employee");
const Student = require("./Student");

const employee = new Employee("영희", 20, "남자", "사원", 20000);
const student = new Student("철수", 33, "여자", "12345678", "법합");

employee.greet("대표");
student.greet("교수");