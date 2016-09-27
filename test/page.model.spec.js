var models = require('../models');
var Page = models.Page;
var expect = require('chai').expect;


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

  describe('Virtuals', function () {
    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"');
    });
    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML');
    });
  });

  describe('Class methods', function () {
    describe('findByTag', function () {
      it('gets pages with the search tag');
      it('does not get pages without the search tag');
    });
  });

  describe('Instance methods', function () {
    describe('findSimilar', function () {
      it('never gets itself');
      it('gets other pages with any common tags');
      it('does not get other pages without any common tags');
    });
  });

  describe('Validations', function () {
    it('errors without title');
    it('errors without content');
    it('errors given an invalid status');
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });

});