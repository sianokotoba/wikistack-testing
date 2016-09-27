var expect = require('chai').expect;

describe("runs asynchronously", function() {
  it("takes 1000 milliseconds to run", function(done){
    setTimeout(function () {
      console.log('I ran for 1000 ms');
      done();
    }, 1000);
  });
});
