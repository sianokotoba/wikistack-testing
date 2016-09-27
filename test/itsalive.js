var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);

describe("runs asynchronously", function() {
  it("takes 1000 milliseconds to run", function(done){
    setTimeout(function () {
      console.log('I ran for 1000 ms');
      done();
    }, 1000);
  });
});

describe('spyOn forEach', function() {
it('will invoke a function once per element', function () {
  var arr = ['x','y','z'];
  function logNth (val, idx) {
    console.log('Logging elem #'+idx+':', val);
  }
  logNth = chai.spy(logNth);
  arr.forEach(logNth);
  expect(logNth).to.have.been.called.exactly(arr.length);
});


})
