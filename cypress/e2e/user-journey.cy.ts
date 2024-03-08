describe ("User Journey", () => {
    it("a user can find a course on the home page and complete the course lessons", () => {
        //go to the home page
        cy.visit("http://localhost:3000")
        //click the "get started button for the first course"
        cy.getByData("course-0").find("a").contains("Get started").click()
        //check that you're on the right page
        cy.location("pathname").should("equal", "/testing-your-first-application")
        //click the button to start the lesson
        cy.getByData("next-lesson-button").click()
        //check that you're on the first lesson
        //you can use "eq" as shorthand for equal even if you aren't using arrays
        cy.location("pathname").should("eq", "/testing-your-first-application/app-install-and-overview")
        //check that the correct answer results in the "next lesson" button popping up, and then click that button to go to the next lesson
        cy.getByData("challenge-answer-0").click()
        cy.getByData("next-lesson-button").should("exist").click()
        //check that we're on the right page after clicking the next lesson button
        cy.location("pathname").should("eq", "/testing-your-first-application/installing-cypress-and-writing-our-first-test")
        //rinse and repeat
        cy.getByData("challenge-answer-0").click()
        cy.getByData("next-lesson-button").should("exist").click()
        cy.location("pathname").should("eq", "/testing-your-first-application/setting-up-data-before-each-test")
        cy.getByData("challenge-answer-0").click()
        cy.getByData("next-lesson-button").should("exist").click()
        cy.location("pathname").should("eq", "/")
    })
})