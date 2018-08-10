console.log('starting app');

setTimeout(()=>{
  console.log('inside timeout')
}, 2000);

setTimeout(()=>{
  console.log("second timeout")
}, 0);

console.log('finishing App');