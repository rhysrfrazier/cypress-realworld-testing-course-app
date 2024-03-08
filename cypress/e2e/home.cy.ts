//the describe block takes two arguments: a string that describes the test it contains, and a callback function
describe('home page', () => {
  //the callback function can contain a beforeEach hook, which runs before each test. Since we want to test on the same page, we can tell it to visit the page before each test, so we don't have to keep typing that:
  beforeEach(() => {
    //cy.visit tells Cypress where to execute the test. We're running on localhost:3000, but you could run it on a live site too
    //(running on https anything might give you an SSL error, if so, take off the s)
    cy.visit("http://localhost:3000")
    //the h1 will show not visible, though, because the test runs before the Next.js app fully hydrates everything in dev mode. To fix this, let's make sure the div tag that the next app is mounted to is visible right after visiting 
    cy.get("#__next").should("be.visible")
  })

  //you can use a context block to make your spec files easier to read, too:
  context("Hero section", () => {
    //the callback function contains an "it block." The it block is the actual test
    //each "it" you see within a given spec file is a single test, and it takes the same arguments as the describe() function: a string describing the test and a callback function
    it('the h1 contains the correct text', () => {
      //now, tell it what element to look for with the .get() method:
      cy.getByData("hero-heading").contains("Testing Next.js Applications with Cypress")
    })

    //What happens if there aren't any data-test or data attributes, and we can't change the HTML?
    //we don't need to keep running that first test every time we save, so add "only" on your it block to tell it to only run this test. you can add this to multiple tests
    it('the features on the homepage are correct', () => {
      //cy.get("dt") gives us back an array of three elements, so in order to get a specific index we can use the "eq([index])" cypress command, like so:
      cy.get("dt")
        .eq(0)
        .contains("4 Courses")
      //contains is case sensitive! you could also do a case-insensitive comparison with regex like this:
      // cy.get("dt").eq(0).contains(/4 courses/i)
      cy.get("dt")
        .eq(1)
        .contains("25+ Lessons")
      cy.get("dt")
        .eq(2)
        .contains("Free and Open Source")
    })
  })

  context("Courses section", () => {

    it("Course: Testing Your First Next.js Application", () => {
      //.find() allows you to get elements within another one - in this case, we're looking for all of the anchor tags within the div "course-0" (which will include the get started button)
      cy.getByData("course-0").find("a")
      //we get 4 of them back (each of the individual lessons, plus the get started button), but we don't want to use eq() this time in case a lesson is added or removed from the course. Let's use contains() to look for an a-tag that contains "get started"
        .contains("Get started").click()
        //now we make sure the button took us to the correct page:
      cy.location("pathname").should("equal", "/testing-your-first-application")
    })

    it ("Course: Testing Foundations", () => {
      cy.getByData("course-1").find("a").contains("Get started").click()
      cy.location("pathname").should("equal", "/testing-foundations")
    })
  })

  it ("Course: Cypress Fundamentals", () => {
    cy.getByData("course-2").find("a").contains("Get started").click()
    cy.location("pathname").should("equal", "/cypress-fundamentals")
  })

})

//note on best practice with .get(): using HTML elements, classes, and IDs isn't great, because those things might change over time, either through DOM manipulation or as your site evolves. It's instead recommended to use data attributes, or data-test attributes, which are only used for testing purposes and won't ever change