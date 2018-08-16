const expect = require('expect');
const request = require('supertest');

const {App} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  text: 'our first todo activity'
},{
  text: 'our second todo activity'
}]

beforeEach((done) => {
  Todo.remove({}).then(()=> {
    Todo.insertMany(todos)
  }).then(() => done())
});

describe('POST /todos',() => {
  it('should create a new Todo', (done) => {
    var text = 'this is the text we are talking about';

    request(App)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err){
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it ('should not save data with invalid data',() => {
    request(App)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err,res) => {
        if (err){
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
        }).catch(e => done(e));
      })
  })
});

describe('GET /todos',() => {
  it('should return all todos',(done) => {
    request(App)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(todos.length).toBe(2)
      })
      .end(done);
  });
});