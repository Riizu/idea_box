require 'rails_helper'

RSpec.feature describe "A visitor can delete an existing idea" do
  scenario "they delete an idea", :js => true do
      idea = create_list(:idea, 5)
      unmatching_idea = create(:idea, title: "Z")
      
      visit '/'

      expect(page).to have_selector('.idea')
      
      fill_in "search-field", with: "T"

      expect(page).to have_css("#idea-#{unmatching_idea.id}", :visible => false)

      fill_in "search-field", with: ""

      expect(page).to have_css("#idea-#{unmatching_idea.id}", :visible => true)
  end
end