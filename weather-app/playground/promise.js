var addSync = (a, b) => {
    return new Promise((resolve, reject) => {
      if (typeof a === "number" && typeof b === "number"){
        resolve(a + b);
      } else{
        reject('the two arguments must numbers')
      }
    })
}

addSync(4,'3').then((res) => {
  console.log('result: ',res);
  return addSync(res,33)

}).then((res) => {
  console.log('this should be 40: ',res);
}).catch((error)=>{
  console.log(error);
})
// var somePromise = new Promise((resolve,reject)=>{
//  setTimeout(()=>{
//   // resolve('Hey wadup it worked');
//   reject('unable to fulfill promise');
//  },2500)
// });

// somePromise.then((message)=>{
//   console.log('success: ', message);
// },(message)=>{
//   console.log('failure: ', message);
// })