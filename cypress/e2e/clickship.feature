Feature: Clickship Order Automation

  Scenario:
    Given User visits "login" page
    And I login with my credentials
    And I click the "fulfilled" link in the "order summary" section of the "dashboard" page
    And I click the "filters" element in the "filter" section of the "orders" page
    And I check the "canada destination" element in "filter" section of the "orders" page
    And I click the "apply button" element in the "filter" section of the "orders" page
    Then I select the item "100" from "number of orders" element in "filter" section of the "orders" page
#    And I select the "<string>" [^.]* the "<string>" section of the "<string>" page
