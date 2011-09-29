@highlights
Feature: Highlights
  In order to have highlights on my website
  As an administrator
  I want to manage highlights

  Background:
    Given I am a logged in refinery user
    And I have no highlights

  @highlights-list @list
  Scenario: Highlights List
   Given I have highlights titled UniqueTitleOne, UniqueTitleTwo
   When I go to the list of highlights
   Then I should see "UniqueTitleOne"
   And I should see "UniqueTitleTwo"

  @highlights-valid @valid
  Scenario: Create Valid Highlight
    When I go to the list of highlights
    And I follow "Add New Highlight"
    And I fill in "Color" with "This is a test of the first string field"
    And I press "Save"
    Then I should see "'This is a test of the first string field' was successfully added."
    And I should have 1 highlight

  @highlights-invalid @invalid
  Scenario: Create Invalid Highlight (without color)
    When I go to the list of highlights
    And I follow "Add New Highlight"
    And I press "Save"
    Then I should see "Color can't be blank"
    And I should have 0 highlights

  @highlights-edit @edit
  Scenario: Edit Existing Highlight
    Given I have highlights titled "A color"
    When I go to the list of highlights
    And I follow "Edit this highlight" within ".actions"
    Then I fill in "Color" with "A different color"
    And I press "Save"
    Then I should see "'A different color' was successfully updated."
    And I should be on the list of highlights
    And I should not see "A color"

  @highlights-duplicate @duplicate
  Scenario: Create Duplicate Highlight
    Given I only have highlights titled UniqueTitleOne, UniqueTitleTwo
    When I go to the list of highlights
    And I follow "Add New Highlight"
    And I fill in "Color" with "UniqueTitleTwo"
    And I press "Save"
    Then I should see "There were problems"
    And I should have 2 highlights

  @highlights-delete @delete
  Scenario: Delete Highlight
    Given I only have highlights titled UniqueTitleOne
    When I go to the list of highlights
    And I follow "Remove this highlight forever"
    Then I should see "'UniqueTitleOne' was successfully removed."
    And I should have 0 highlights
 