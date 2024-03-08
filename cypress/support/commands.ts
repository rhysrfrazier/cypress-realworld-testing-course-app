/// <reference types="cypress" />

//RF notes: The following allows us to "get" data test attributes in a less verbose way. We're using typescript, so first have to add the type definition for the custom command in {}. We extend the Chainable interface from the Cypress namespace, which holds common utilities and constants, to make getByData part of it:
declare namespace Cypress {
    interface Chainable {
        getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>
    }
}

//Now we specify what getByData will do:
Cypress.Commands.add('getByData', (selector) => {
    return cy.get(`[data-test=${selector}]`)
})
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }