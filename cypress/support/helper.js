/// <reference types='cypress'/>
/// <reference types='cypress-mailslurp' />
import { attach } from '@badeball/cypress-cucumber-preprocessor'

class Helpers{
    visit(url) {
        cy.visit(url, {
            headers: {
                'Accept-Encoding': 'gzip, deflate',
                Connection: 'Keep-Alive'
            }
        }, { timeout: 20000 })
    }
    takeScreenshot() {
        const screenshotFile = `${Date.now()}`
        cy.screenshot(screenshotFile, { capture: 'runner' })
    }

    loadData(file, opt) {
        cy.fixture(file).then((data) => {
            cy.wrap(data).as(file)
        })
    }

    getSelector(page, section, key) {
        const p = page.toLowerCase().replaceAll(/\s+/g, '_')
        const s = section.toLowerCase().replaceAll(' ', '_')
        const k = key.toLowerCase().replaceAll(' ', '_')
        cy.log(s)
        return cy.get('@selectors').then(data => data[p][s][k])
    }

    enterText(text, page, section, key, position = 'first', isKeys = false) {
        const pos = this.getPosition(position)
        this.getSelector(page, section, key).then(el => {
            const txt = isKeys ? `{${text}}` : text
            cy.log(el, text)
            if (isKeys) {
                cy.get(el, { timeout: 30000 }).eq(pos).type(txt)
            } else {
                cy.get(el, { timeout: 30000 }).eq(pos).type(txt)
            }
        })
    }

    selectItem(opt, page, section, key, position = 'first') {
        const pos = this.getPosition(position)
        this.getSelector(page, section, key).then(el => {
            cy.get(el, { timeout: 30000 }).eq(pos).as('element')
            cy.get('@element').should('be.visible').select(opt, { force: true })
        }).then(() => { /* this.snap() */
        })
    }
    clickOnItem(page, section, key, position = 'first', isOpaque = false, direct = false) {
        const pos = this.getPosition(position)
        this.getSelector(page, section, key).then(el => {
            if (isOpaque) {
                cy.get(el, { timeout: 20000 }).eq(pos).as('element')
            } else {
                cy.get(el, { timeout: 20000 }).eq(pos).should('be.visible').as('element')
            }
            cy.get('@element').click({ force: true })

        }).then(() => { /* this.snap() */
        })
    }


    checkUncheckItem(opt, page, section, key, position = 'first') {
        const pos = this.getPosition(position)
        this.getSelector(page, section, key).then(el => {
            cy.log(opt)
            cy.get(el, { timeout: 20000 }).eq(pos).as('element')
            if (opt === 'check') {
                cy.get('@element', { timeout: 10000 }).should('be.enabled').check({ force: true })
            } else {
                cy.get('@element', { timeout: 10000 }).should('be.enabled').uncheck({ force: true })
            }
        }).then(() => { /* this.snap() */
        })
    }

    getPosition(pos) {
        let idx
        const p = pos.toLowerCase()
        switch (p) {
            case 'first':
                idx = 0
                break
            case 'second':
                idx = 1
                break
            case 'third':
                idx = 2
                break
            case 'fourth':
                idx = 3
                break
            case 'fifth':
                idx = 4
                break
            case 'sixth':
                idx = 5
                break
            case 'seventh':
                idx = 6
                break
            case 'eight':
                idx = 7
                break
            case 'ninth':
                idx = 8
                break
            case 'tenth':
                idx = 9
                break
            default:
                idx = 0
        }
        return idx
    }

}export default Helpers
