const arr = [7, 7, 7, 7, 7]

const logArr = [0, 0, 0, 0, 0, 0]

let j = 0, k = 0
const n = arr.length

for (let i = 0; i < n; i++) {
    if (arr[i] > n || logArr[arr[i]] !== 0) {
        while (j < n && logArr[j] !== 0) j++;
        if (j < n) {
            logArr[j] = 1
            k++
        }
    } else {
        logArr[arr[i]] = 1
    }
}

console.log(k)

