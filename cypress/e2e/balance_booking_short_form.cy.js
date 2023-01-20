/// <reference types="cypress" />

// This test case spec contains everything needed to run a full visual test against site get-balance.ru.
// The file `applitools.config.js` specifies how to run this test against multiple browsers in Applitools Ultrafast Grid.

// This "describe" method contains related test cases with per-test setup and cleanup.
// In this example, there is only one test.
describe('Visual testing of booking of flats - balance', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false
    })

    // This method performs setup before each test.
    beforeEach(() => {

        // Open Eyes to start visual testing.
        // Each test should open its own Eyes for its own snapshots.
        cy.eyesOpen({
            appName: 'balance_booking',                 // The name of the app under test
            testName: Cypress.currentTest.title,        // The name of the test case
            batchName: 'balance_booking_short_form'
        })
    })

    // The interactions use typical Cypress calls, but the verifications use one-line snapshot calls with Applitools Eyes.
    // If the page ever changes, then Applitools will detect the changes and highlight them in the dashboard.
    // Traditional assertions that scrape the page for text values are not needed here.
    it('Booking on balance', () => {

        // Load the main page.
        cy.visit('https://get-balance.ru/booking/form/?flat=4922')
        // cy.visit('https://get-balance.ru/booking/form/?flat=4911')
            
        cy.eyesCheckWindow({
            tag: "Short form"
        });

        cy.get('.jq-selectbox__select').click() // кликаем в селектор "способ оплаты"

        cy.eyesCheckWindow({
            tag: "Payment select",
            target: 'region',
            sizeMode: 'selector',
            selector: '.jq-selectbox__dropdown'
        });
''   })

    // This method performs cleanup after each test.
    afterEach(() => {
        
        // Close Eyes to tell the server it should display the results.
        cy.eyesClose()
    })
})