const expect = require('expect');

const utils = require('./utils')

describe('utils', () => {
  it('should add two number', () => {
    var res = utils.add(10,11);
  
    expect(res)
      .toBe(21)
      .toBeA('number');
    // if (res !== 21){
    //   throw new Error(`expected 21 but got ${res}`)
    // }
  });
  
  it('should add async numbers', (done) => {
    utils.addSync(4, 3, (sum) => {
      expect(sum).toBe(7).toBeA('number');
      done();
    });
  });
  
  it('should square itself',() => {
    var rest = utils.square(3);
    
    expect(rest).toBe(9).toBeA('number');
    
    // if (rest !== 9){
    //   throw new Error('this is inCorrect')
    // }
  });
  
  it('should square a number as an async function',(done) => {
    utils.squareSync(4, (res) => {
      expect(res).toBe(16).toBeA('number');
      done();
    });
  });

  it('should verify the existence of some property', ()=>{
    var user1 = utils.setName({location: 'enugu', age: 34}, "Mr Excel");
    expect(user1).toInclude({firstName: 'Mr', lastName: 'Excel'}).toBeA('object');
  });
  
});

describe('playing with objects in our utils', () => {
  it('should accept a value', () => {
    // expect(12).toNotBe(11);
    // expect({name: 'Excel'}).toNotEqual({name: 'excel'});
    // expect([2,3,4]).toInclude(2);
    // expect({
    //   name: 'excel',
    //   age: 25,
    //   location: 'philadelphia'
    // }).toInclude({
    //   age: 25
    // });
    expect({
      name: 'excel',
      age: 25,
      location: 'philadelphia'
    }).toExclude({
      age: 24
    });
  });
});


