describe ("Newsletter Subscribe Form", () => {
    beforeEach (() => {
        cy.visit("http://localhost:3000")
        cy.get("#__next").should("be.visible")
    })

    it("allows users to subscribe to the email list", () => {
        cy.getByData("email-input")
            //type as in the act of typing on a keyboard, not as in kind or variety as in typescript
            .type("tom@aol.com")
        cy.getByData("submit-button").click()
        cy.getByData("success-message").should("exist").contains("tom@aol.com")
    })

    it("does NOT allow an invalid email address", () => {
        cy.getByData("email-input").type("tom")
        cy.getByData("submit-button").click()
        cy.getByData("success-message").should("not.exist")
    })

    it.only("does NOT allow users to sign up for newsletter is already subscribed", () => {
        cy.getByData("email-input").type("john@example.com")
        cy.getByData("submit-button").click()
        cy.getByData("server-error-message").should("exist").contains("already exists. Please use a different email address")
    })
})