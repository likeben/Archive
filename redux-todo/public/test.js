let arr = [1, 2, 3, 4, 5];

arr1 = arr.map(function(item, index) {

  if (index === 2) {
    return item + 1;
  }

})

console.log(arr1);