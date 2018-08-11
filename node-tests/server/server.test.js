const request = require('supertest');
const expect = require('expect')

const app = require('./server').app;

describe('server', () => {
  describe('#checking for hello world display in our server test file', () => {
    it('should display hello world', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .expect("HELLO WORLD!!!")
        .end(done)
    });
  });
  
  describe('#checking for the existence of an object in a data sent back by a route', () => {
    it('should verify user\'s property', (done) => {
      request(app)
      .get('/user')
      .expect(200)
      .expect((res) => {
        expect(res.body).toInclude({name: 'Excel', age: 35})
      })
      .end(done)
    });
  });
  
});
