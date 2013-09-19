
describe("Integration", function() {
  describe("Home", function(){

    it("should have a navbar", function(){
      visit('/').then(function(){
        return find('.navbar').should.exist;
      })
      .click('a:contains("Worlds")')
      .then(function() {
        return click('a:contains("Anvil Rock")');
      });
    });

    it("should have a navbar", function(){
      visit('/').then(function(){
        return find('.navbar').should.exist;
      })
      .click('a:contains("Worlds")')
      .then(function() {
        return click('a:contains("Anvil Rock")');
      });
    });

  });
});
