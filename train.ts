// Task - F

function getReverse(a: string): boolean {
    if (a.length === [...new Set(a)].length) {
      return false;  
    } else {
      return true;   
    }
  }
  
  console.log(getReverse("asdfasgsa"));  
    console.log(getReverse("abcdef"));   
  


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