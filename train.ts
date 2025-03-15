// task I

function majorityElement(arr: number[]): number[] {  
  let newArray = [...new Set(arr)];
  let result: { [key: number]: number } = {};
  let values: number[], maxCount: number;
  let mostFrequentElements: number[] = [];

  newArray.forEach(e => {
      result[e] = arr.filter(i => i === e).length;
  });

  values = Object.values(result);
  maxCount = Math.max(...values);

  for (let key in result) {
      if (result[key] === maxCount) {
          mostFrequentElements.push(parseInt(key));
      }
  }

  return mostFrequentElements;  
}


let arr: number[] = [1, 2, 3, 4, 5, 4, 3, 4]; 
let mostFrequent = majorityElement(arr);

console.log(`Eng ko'p uchragan elementlar: ${mostFrequent}`);



// Task -H 

// function getPositive(numbers: number[]){
//   const a: number[] = [];  
//   numbers.forEach((number: number) => {
//     if (number > 0) {
//       a.push(number);  
//     }
//   });
//   return a.join('');
// }

// const numbers: number[] = [1, -2, 3, -4, 5];  
// const result: string = getPositive(numbers);  
// console.log(result);  




// // Task - F

// function getReverse(a: string): boolean {
//     if (a.length === [...new Set(a)].length) {
//       return false;  
//     } else {
//       return true;   
//     }
//   }
  
//   console.log(getReverse("asdfasgsa"));  
//     console.log(getReverse("abcdef"));   
  


// Task - G
  
// function findMaxIndex(x: any[])  {
//     for (let i = 0; i < x.length; i++) {
//       if (!Number.isInteger(x[i])) {
//         console.log("Iltimos butun sondan iborat array kiriting:");
//         return;
//       }
//     }
  
//     const a = x.slice().sort((a, b) => a - b);  // slice() yordamida yangi massiv nusxasini yaratib, tartiblaymiz
//     const highestValue = a[a.length - 1];
//     const highestIndex = x.indexOf(highestValue);
  
//     console.log("Eng katta qiymat indeksi:", highestIndex);
//   }
  
  
//   findMaxIndex([10, 2, 30, 4, 7]);  
//   findMaxIndex([10, 2, '30', 4, 7]);  
//   findMaxIndex(['asdasda2']); 
//   findMaxIndex([10, 2, 30, 4, 30, 44]);


