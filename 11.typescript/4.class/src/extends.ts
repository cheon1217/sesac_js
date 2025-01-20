interface BasicInfo {
    name: string;
    age: number;
}

interface ContactInfo {
    email: string;
    phone: string;
}

interface Employee extends BasicInfo, ContactInfo {
    employeeId: number;
}

const employee1: Employee = {
    name: "bob",
    age: 25,
    email: "bob@bob.com",
    phone: "010-1234-5678",
    employeeId: 123
}

console.log(`직원 정보: ${employee1.name}, ${employee1.age}, ${employee1.email}, ${employee1.phone}, ${employee1.employeeId}`);