//Selection Sort: selects minimum
function SelectionSort(arr) {

    for(let i=0; i < arr.length-1; i++) {
        let minIndex = i;

        for(j=i+1; j< arr.length; j++) {
            if(arr[j] < arr[minIndex]){
                minIndex = j;
            }
        }
        console.log("Minimum Index: ", minIndex);

        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
        console.log(`Res[${i}]: `, arr[i]);

    }

    return arr;
}

//Bubble Sort: swaps the elements until the maximum element is at the last
function BubbleSort(arr) {
    for(let i = 0; i < arr.length-1; i++) {

        for(let j=0; j < arr.length-i-1; j++) {
            if(arr[j] > arr[j+1]){
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }

    return arr;
}

//Insertion Sort: takes an element and places it in it's correct position
function InsertionSort(arr) {
    for(let i=0; i < arr.length-1; i++) {
        for(let j = i+1; j > 0; j--) {
            if(arr[j] < arr[j-1]){
                let temp = arr[j];
                arr[j] = arr[j-1];
                arr[j-1] = temp 
            }
        }
        console.log(`Array after ${i}th iteraton: `, arr)
    }

    return arr;
}

//Merge Sort: Divide and merge
function MergeSort(arr, low, high) {
    if(low >= high) return;

    let mid = Math.floor((low+high)/2);

    MergeSort(arr, low, mid);
    MergeSort(arr, mid+1, high);
    MergeMethod(arr, low, mid, high);
};

function MergeMethod(arr, low, mid, high) {
    let temp = [];

    let left = low;
    let right =  mid+1;

    while(left <= mid && right <= high) {
        if(arr[left] <= arr[right]){
            temp.push(arr[left]);
            left++;
        }else{
            temp.push(arr[right]);
            right++;
        }
    }

    while(left <= mid) {
        temp.push(arr[left]);
        left++;
    }
    
    while(right <= high) {
        temp.push(arr[right]);
        right++;
    }

    for(i = low; i<=high; i++) {
        arr[i] = temp[i-low];
    }
}

// Driver Code
const arr = [2, 3, -8, 7, -1, 2, 3];
MergeSort(arr, 0, arr.length-1);
console.log(arr)