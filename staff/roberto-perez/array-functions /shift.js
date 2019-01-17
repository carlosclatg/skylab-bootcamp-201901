/**
 *
 * @param {Array} arr - The array to reverse.
 *
 * @returns {Array} - Array reverse
 */
function shift(arr) {
  if (!(arr instanceof Array)) {
    throw new TypeError(arr + " is not an array");
  }

  var newArr = [];
  var result = arr[0];

  var k = 0;
  for(var i = 1; i < arr.length; i++) {
    newArr[k++] = arr[i];
  }
  arr.length = newArr.length;
  
  for (var i = 0; i < newArr.length; i++) {
    var element = newArr[i];
    arr[i] = element;
  }

  arr.length = newArr.length;

  return result;
}
