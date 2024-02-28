function findCombinations(arrA, arrB) {
    const maxSum = 13;
    let maxLength = 0;
    let bestCombination = null;
  
    for (let i = 1; i <= arrA.length; i++) {
      const combinationsA = getCombinations(arrA, i);
      for (const combA of combinationsA) {
        for (let j = 1; j <= arrB.length; j++) {
          const combinationsB = getCombinations(arrB, j);
          for (const combB of combinationsB) {
            const sumA = combA.reduce((acc, val) => acc + val, 0);
            const sumB = combB.reduce((acc, val) => acc + val, 0);
            if (sumA === sumB && sumA <= maxSum) {
              const length = combA.length + combB.length;
              if (length > maxLength) {
                maxLength = length;
                bestCombination = [combA, combB];
              }
            }
          }
        }
      }
    }
  
    return bestCombination;
  }
  
  function getCombinations(arr, k) {
    const result = [];
    function backtrack(start, current) {
      if (current.length === k) {
        result.push([...current]);
        return;
      }
      for (let i = start; i < arr.length; i++) {
        current.push(arr[i]);
        backtrack(i + 1, current);
        current.pop();
      }
    }
    backtrack(0, []);
    return result;
  }
  
  const arrA = [1, 1, 9];
  const arrB = [6, 1, 8, 11];
  const result = findCombinations(arrA, arrB);
  console.log('Best combination:', result);

//single array result version:

/*
function findCombinations(arrA, arrB) {
    const maxSum = 13;
    let maxLength = 0;
    let bestCombination = null;

    for (let i = 1; i <= arrA.length; i++) {
        const combinationsA = getCombinations(arrA, i);
        for (const combA of combinationsA) {
            for (let j = 1; j <= arrB.length; j++) {
                const combinationsB = getCombinations(arrB, j);
                for (const combB of combinationsB) {
                    const sumA = combA.reduce((acc, val) => acc + val, 0);
                    const sumB = combB.reduce((acc, val) => acc + val, 0);
                    if (sumA === sumB && sumA <= maxSum) {
                        const combinedCombination = [...combA, ...combB]; // Combine both combinations
                        const length = combinedCombination.length;
                        if (length > maxLength) {
                            maxLength = length;
                            bestCombination = combinedCombination;
                        }
                    }
                }
            }
        }
    }

    return bestCombination;
}

function getCombinations(arr, k) {
    const result = [];
    function backtrack(start, current) {
        if (current.length === k) {
            result.push([...current]);
            return;
        }
        for (let i = start; i < arr.length; i++) {
            current.push(arr[i]);
            backtrack(i + 1, current);
            current.pop();
        }
    }
    backtrack(0, []);
    return result;
}

//Inputs arrA and arrB card deck:
const arrA = [4, 6, 11];
const arrB = [12, 6, 8, 1];
const result = findCombinations(arrA, arrB);
console.log('Best combination:', result);

*/
  