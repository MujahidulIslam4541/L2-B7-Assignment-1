// Question 1
const filterEvenNumbers = (numbers: number[]): number[] => {
  return numbers.filter((num) => num % 2 === 0);
};

// Question 2
const reverseString = (str: string): string => {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
};

// Question 3
type StringOrNumber = string | number;

const checkType = (value: StringOrNumber): string => {
  if (typeof value === "string") {
    return "String";
  }
  return "Number";
};

// Question 4
const getProperty = <T>(obj: T, key: keyof T): T[keyof T] => {
  return obj[key];
};

// Question 5
interface Book {
  title: string;
  author: string;
  publishedYear: number;
}
const toggleReadStatus = (book: Book): Book & { isRead: boolean } => {
  return { ...book, isRead: true };
};



// question 6
class Person {
  constructor(public name: string, public age: number) {}
}

class Student extends Person {
  constructor(name: string, age: number, public grade: string){
    super(name,age);
  }
  getDetails():string{
    return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
  }
}


// question 7
const getIntersection=( arr1: number[], arr2: number[]): number[]=>{
    return arr1.filter((num)=>arr2.includes(num))
}

