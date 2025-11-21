{/*
    Given an integer array nums, find the subarray with the largest sum, and return its sum.
Example 1:
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.

Example 2:
Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.

Example 3:
Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
*/}

function largestSubArraySum (arr) {
    let tempMin = 0;
    let totalNumbers = arr.length;

    for(let i =0; i < totalNumbers; i++) {
        tempMin += arr[i];


    }

}

function sortColors (arr) {
    console.log(arr)
    let red = 0;
    let blue = 2;

    let redPointer = 0;
    let whitePointer = 0;
    let bluePointer = arr.length-1;

    console.log("Initial blue pointer: ", bluePointer);

    while(whitePointer <= bluePointer) {
        if(redPointer >= bluePointer)
            break;

        if(arr[redPointer] === red){
            let temp = arr[whitePointer];
            arr[whitePointer] = arr[redPointer];
            arr[redPointer] = temp;

            redPointer++;
            whitePointer++;
        }if(arr[whitePointer] === 1) {
            whitePointer++; 
        } 
        else{
            let temp = arr[whitePointer];
            arr[whitePointer] = arr[bluePointer];
            arr[bluePointer] = temp;

            bluePointer--;

        }

        console.log(redPointer, bluePointer);
        console.log(arr);
    }

    return arr;
        
}

const arr = [1,0,2,0,2,1,1,0,0,2];
console.log(sortColors(arr));