/// <reference types="cypress" />
/// <reference types="@applitools/eyes-cypress" />

// const { divide } = require("cypress/types/lodash")

// This test case spec contains everything needed to run a full visual test against site beregovoy-kvartal.ru.
// The file `applitools.config.js` specifies how to run this test against multiple browsers in Applitools Ultrafast Grid.

// This "describe" method contains related test cases with per-test setup and cleanup.
// In this example, there is only one test.
describe('Visual AI testing Beregovoy 2', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false
    })

    // This method performs setup before each test.
    beforeEach(() => {

        // Open Eyes to start visual testing.
        // Each test should open its own Eyes for its own snapshots.
        cy.eyesOpen({
            appName: 'Beregovoy 2',                     // The name of the app under test
            testName: Cypress.currentTest.title,        // The name of the test case
            batchName: 'Beregovoy 2',
            // browser: { width: 800, height: 600 }
        })
    })

    // The interactions use typical Cypress calls, but the verifications use one-line snapshot calls with Applitools Eyes.
    // If the page ever changes, then Applitools will detect the changes and highlight them in the dashboard.
    // Traditional assertions that scrape the page for text values are not needed here.
    it('Pages of Beregovoy 2', () => {

        // Load the main page.
        cy.visit('https://beregovoy-kvartal.ru/')
        cy.get('.circle_3HyQf').click() // закрываем уведомление о сборе куки
        
        // далее для загрузки "ленивых" изображений подскролливаем страницу к блокам с lazy image и ожидаем по 2 сек.
        cy.get('.topWrap_27XFq').scrollIntoView() // слайдер Квартиры
        cy.wait(2000)
        cy.get('.FlatsSection_3UDpM > .ImageBreak_2s0Oj > .images_3BPDa > .image-lazy > .image-lazy__image').scrollIntoView() // рендер "Общественная гостиная с камином и видом на двор"
        cy.wait(2000)
        cy.get('.content_3jQDr').scrollIntoView() // слайдер "Благоустройство"
        cy.wait(2000)
        cy.get('.LandscapeSection_1MP-_ > .ImageBreak_2s0Oj > .images_3BPDa > .image-lazy > .image-lazy__image').scrollIntoView() // рендер "Набережная парк"
        cy.wait(2000)
        cy.get('.images_3_i7t > .image-lazy > .image-lazy__image').scrollIntoView() // рендер "Архитектура вне времени"
        cy.wait(2000)
        cy.get('.mapWrap_2W_nO').scrollIntoView() // карта "Историческое место"
        cy.wait(2000)
        cy.get('.FormBlock_hCgnB').scrollIntoView() // блок с рендером "Приезжайте на персональную презентацию"
           
        // Verify the full main page loaded correctly.
        cy.eyesCheckWindow({
            tag: "Main page"
        });

        cy.get('.Burger_1RLjo').click() // кликаем на кнопку бургер-меню в хедере

        cy.eyesCheckWindow({
            tag: "Hamburger menu",
            target: 'window',
            fully: false
        });

        cy.get('a.cursor-pointer._exact-link._active-link').click() // кликаем на ссылку "Интернет-бутик" в бургер-меню
        // cy.get('.circle_3HyQf').click() // закрываем уведомление о сборе куки

        cy.eyesCheckWindow({
            tag: "Butik kvartir",
            // target: 'region',
            // selector: 'div.top_j2NL6'
        });

        cy.visit('https://beregovoy-kvartal.ru/flats/11-2-432') // переходим в карточку произвольной квартиры

        cy.eyesCheckWindow({
            tag: "Flat card"
        });
        
        cy.get('button.circle-button.cursor-pointer').click() // кликаем на кнопку "Купить онлайн"

        cy.eyesCheckWindow({
            tag: "Short booking form"
        });
        
        cy.visit('https://beregovoy-kvartal.ru/404',{failOnStatusCode: false}) // to handle status code exception
        
        cy.eyesCheckWindow({
            tag: "404 paga"
        });

        // cy.contains('Коммерческие помещения').click() // переходим в раздел Коммерческие помещения
        // cy.url().should('include', '/commercial')

        // cy.eyesCheckWindow({
        //     tag: "Commercial premises"
        // });

        // cy.get('.Burger_1RLjo').click()
        // cy.contains('Динамика строительства').click() // переходим в раздел Динамика строительства
        // cy.url().should('include', '/progress')

        // cy.eyesCheckWindow({
        //     tag: "Construction dynamics"
        // });

        // cy.get('.Burger_1RLjo').click()
        // cy.contains('Документы').click() // переходим в раздел Документы
        // cy.url().should('include', '/documents')

        // cy.eyesCheckWindow({
        //     tag: "Documents"
        // });
        
        // cy.get('.Burger_1RLjo').click()
        // cy.contains('Видео').click() // переходим в раздел Видео
        // cy.url().should('include', '/videos')

        // cy.eyesCheckWindow({
        //     tag: "Videos"
        // });
    })

    // This method performs cleanup after each test.
    afterEach(() => {
        
        // Close Eyes to tell the server it should display the results.
        cy.eyesClose()
    })
})