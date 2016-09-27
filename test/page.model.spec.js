var models = require('../models');
var Page = models.Page;
var expect = require('chai').expect;
var marked = require('marked');

// describe('Page model', function () {
//   var ourPage, data;
//   beforeEach(function() {
//   	ourPage = Page.create({
//   		title: "JS",
//   		content: "chai is crazy!!",
//   		status: "open",
//   		tags: ["chai", "crazy", "iloveit"]
//   	})
//   	data = ourPage._boundTo.dataValues
//   })
//   describe('keys on page', function () {
//     it('title should be a string', function() {
//     	expect(typeof data.title).to.be.equal("string");
//     });
//     it('urlTitle should be a string', function() {
//     	expect(typeof data.urlTitle).to.be.equal("string");
//     });
//     it('tags should be an array of text', function() {
//     	console.log(data.tags);
//     	expect(Array.isArray(data.tags)).to.equal(true);
//     	expect(typeof data.tags[0]).to.be.equal("string");
//     });
//   });
// });
describe('Page model', function () {

  var ourPage, data;

    beforeEach(function(done) {
     Page.create({
       title: "JS huh? Whaaaat    ",
       content: "chai is crazy!!",
       status: "open",
       tags: ["chai", "crazy", "iloveit"]
     })
     .then(function(result) {
        ourPage = result;
        done();
     })
     .catch(console.error);
    });

    afterEach(function() {
     Page.destroy({
        where: {
            title: ourPage.title
        }
      });
    });

  describe('Virtuals', function () {

    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', function() {
        var urlTitle = ourPage.urlTitle;
        expect(urlTitle).to.equal('JS_huh_Whaaaat_');
        expect(ourPage.route).to.equal('/wiki/JS_huh_Whaaaat_');
      });
    });

    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML', function(){
        expect(ourPage.renderedContent).to.equal(marked(ourPage.content))
      });
    });
  });

  describe('Class methods', function () {
    describe('findByTag', function () {
      it('gets pages with the search tag', function(done) {
        // console.log('ourpage', ourPage)
        var tag = ourPage.tags[0], result;
        Page.findByTag(tag)
        .then(function(pages){
          expect(pages).to.have.lengthOf(1);
          // console.log(result);
          done();
        }).catch(console.error);

      });
      it('does not get pages without the search tag', function(done) {
          Page.findByTag()
        .then(function(pages){
          expect(pages).to.have.lengthOf(0);
          done();
        }).catch(console.error);
      });

    });
  });

  describe('Instance methods', function () {
    var similarPage, diffPage;
    beforeEach(function(done){
      Page.create({
        title: "I'm the same",
        content: "What, I'm so awesome and the same.",
        status: "closed",
        tags: ["iloveit", "same", "awesome"]
      })
      .then(function(result){
        similarPage = result;
        done();
      })
      .catch(done);

      // Page.create({
      //   title: "I'm different",
      //   content: "I'm so sad, I'm dissimilar",
      //   status: "open",
      //   tags: ["different", "outsider", "boohoo"]
      // })
      // .then(function(result){
      //   diffPage = result;
      //   done();
      // })
      // .catch(done);
    });
    beforeEach(function(done){
      Page.create({
        title: "I'm different",
        content: "I'm so sad, I'm dissimilar",
        status: "open",
        tags: ["different", "outsider", "boohoo"]
      })
      .then(function(result){
        diffPage = result;
        done();
      })
      .catch(done);
    });

    afterEach(function() {
     Page.destroy({
        where: {
            title: similarPage.title
        }
      });
    });

    afterEach(function() {
     Page.destroy({
        where: {
            title: diffPage.title
        }
      });
    });

    describe('findSimilar', function () {
      it('never gets itself', function(done){
        ourPage.findSimilar()
          .then(function(result){
            var trueResults = [];
            result.forEach(function(obj){
              if (obj.title === ourPage.title) {
                trueResults.push(false);
              };
            });
            expect(trueResults).to.not.contain(false);
            done();
          })
          .catch(done);
      });

      it('gets other pages with any common tags', function(done) {
        ourPage.findSimilar()
          .then(function(result){
            var trueResults = []
            result.forEach(function(obj){
              return obj.tags.filter(function(singleTag){
                trueResults.push(ourPage.tags.includes(singleTag));
              });
            });
            expect(trueResults).to.contain(true);
            done();
          })
          .catch(done);
        });

      it('does not get other pages without any common tags', function(done){
        ourPage.findSimilar()
          .then(function(result){
            var trueResults = [];
            result.forEach(function(obj){
              if (obj.title !== diffPage.title) {
                trueResults.push(true);
              } else {
                trueResults.push(false);
              }
            });
            expect(trueResults).to.not.contain(false);
            done();
          })
          .catch(done);
      });

    });
  });

  describe('Validations', function () {
    var noTitlePage;
    beforeEach(function(){
      noTitlePage = Page.build({
        title: "hello",
        status: "weird",
        tags: ["noTitle", "nameMe", "sad"]
      })
      // .then(function(result){
      //   noTitlePage = result;
      //   done();
      // })
      // .catch(done);
    });

    // afterEach(function() {
    //  Page.destroy({
    //     where: {
    //         content: "I'm so sad, I don't have a title"
    //     }
    //   });
    // });
    var page;
    beforeEach(function () {
      page = Page.build();
    });

    it('errors without title', function(done) {
      // noTitlePage.validate()
      // .then(function(result) {
      //   expect(result.errors[0].message).to.equal('urlTitle cannot be null')
      //   done();
      // }).catch(done);
      page.validate()
      .then(function (err) {
        expect(err).to.exist;
        expect(err.errors).to.exist;
        expect(err.errors[0].path).to.equal('title');
        // console.log(err.errors)
        done();
      });
      });
    it('errors without content', function(done) {
        noTitlePage.save();
        // console.log(noTitlePage)
        noTitlePage.validate()
        .then(function(result) {
          console.log("checking content: ", result.errors)
          done();
        }).catch(done);
    });
    it('errors given an invalid status');

  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });

});
