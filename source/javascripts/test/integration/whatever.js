
describe("Integration: Whatever", function() {
  describe("Given I click on whatever", function(){
    beforeEach(function(){
      visit('/').then(function(){
        click('.btn');
      });
    });

    it("should display whatever", function(){
      // assert.equal(find('form legend').text(), "Create Whatever");
    });
  });
});
