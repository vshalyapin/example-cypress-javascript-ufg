/// <reference types="cypress" />
/// <reference types="@applitools/eyes-cypress" />

// This test case spec contains everything needed to run a full visual test against site get-balance.ru.
// The file `applitools.config.js` specifies how to run this test against multiple browsers in Applitools Ultrafast Grid.

// This "describe" method contains related test cases with per-test setup and cleanup.
// In this example, there is only one test.
describe('Visual AI testing balance', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false
    })

    // This method performs setup before each test.
    beforeEach(() => {

        // Open Eyes to start visual testing.
        // Each test should open its own Eyes for its own snapshots.
        cy.eyesOpen({
            appName: 'balance',                         // The name of the app under test
            testName: Cypress.currentTest.title,        // The name of the test case
            batchName: 'balance',
            // browser: { width: 800, height: 600 }
        })
    })

    // The interactions use typical Cypress calls, but the verifications use one-line snapshot calls with Applitools Eyes.
    // If the page ever changes, then Applitools will detect the changes and highlight them in the dashboard.
    // Traditional assertions that scrape the page for text values are not needed here.
    it('Pages of balance', () => {

        // Load the main page.
        cy.visit('https://get-balance.ru/')
        cy.get('.cookies-btn').click({force: true}) // закрытие уведомления об использовании куки нажатием на кнопку ок
            
        // Verify the full main page loaded correctly.
        cy.eyesCheckWindow({
            tag: "Main page"
        });

        cy.get('.mb').click() // кликаем на кнопку бургер-меню в хедере

        cy.eyesCheckWindow({
            tag: "Hamburger menu",
            target: 'window',
            fully: false
        });

        cy.get('.desctop').click() // кликаем на ссылку "магазин квартир" в хедере

        cy.eyesCheckWindow({
            tag: "Magazin kvartir",
            // target: 'region',
            // selector: '.catalog-filter'
        });

        // cy.get('.catalog-block-item').first().find('a').first().invoke('removeAttr', 'target').click() // кликаем на первую карточку в списке квартир
        cy.visit('https://get-balance.ru/flats/5311/') // переходим в карточку произвольной квартиры

        cy.eyesCheckWindow({
            tag: "Flat card"
        });

        // cy.get('a').invoke('removeAttr', 'target').click() // нажимаем на кнопку "забронировать"
        cy.visit('https://get-balance.ru/booking/form/?flat=5311') // переходим на короткую форму бронирования произвольной квартиры
                    
        cy.eyesCheckWindow({
            tag: "Short booking form"
        });

        cy.visit('https://get-balance.ru/404',{failOnStatusCode: false}) // to handle status code exception

        cy.eyesCheckWindow({
            tag: "404 paga"
        });
    })

    // This method performs cleanup after each test.
    afterEach(() => {
        
        // Close Eyes to tell the server it should display the results.
        cy.eyesClose()
    })
})