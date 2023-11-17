/// <reference types="cypress"/>
/// <reference types="cypress-localstorage-commands" />
import { Given, Then, When, Before } from '@badeball/cypress-cucumber-preprocessor'
import Helpers from '../helper'
const Helper = new Helpers()

Before(() => {
    Helper.loadData('selectors', 'selectors')
    // Helper.cleanEmail('api_mails.1')
    console.log(Cypress.env("AUTH_USER"))
})

When(/^User visits "([^"]*)" page$/, (url) => {
    Helper.visit(url)
})

Then(/^I (select|click) the "([^"]*)" ([^.]*) the "([^"]*)" section of the "([^"]*)" page$/, (a, k, b, s, p) => {
    Helper.clickOnItem(p, s, k)
    /* Helper.takeScreenshot() */
})

When(/^I (check|uncheck) the "([^"]*)" element in "([^"]*)" section of the "([^"]*)" page$/, (x, k, s, p) => {
        Helper.checkUncheckItem(x, p, s, k)
})

Given(/^I select the item "([^"]*)" from "([^"]*)" element in "([^"]*)" section of the "([^"]*)" page$/, (item, k, s, p) => {
    Helper.selectItem(item, p, s, k)
    /* Helper.takeScreenshot() */
})
When(/^I (entered|typed) the value (.{1,50}) into input on "([^"]*)" element in "([^"]*)" section of the "([^"]*)" page$/, (x, text, k, s, p) => {
    Helper.enterText(text, p, s, k)
    /* Helper.takeScreenshot() */
})
Given(/^I login with my credentials$/, function () {
    Helper.enterText(Cypress.env("AUTH_USER"), "login","modal","username")
    Helper.enterText(Cypress.env("AUTH_PASSWORD"), "login","modal","password")
    Helper.clickOnItem("login","modal","login button")
});
