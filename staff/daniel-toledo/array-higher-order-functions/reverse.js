/** DONE
 * Abstraction of reverse.
 *
 * This method reverses an array in place. The first array element becomes the last,
 * and the last array element becomes the first
 *
 * @param {Array} arr - The array to reverse.
 *
 *@return {Array} - Array revertida
 */
function reverse(arr) {
    var res=Object.assign([],arr)

    for (var i=0; i<arr.length; i++){
        arr[i]=res[arr.length-1-i]
    }

    return arr
}