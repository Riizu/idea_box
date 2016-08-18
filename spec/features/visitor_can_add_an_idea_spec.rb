require 'rails_helper'

RSpec.feature describe "A visitor can add a new idea" do
  scenario "they enter in a new idea", :js => true do
      new_title = "Test Title"
      new_body = "Test body"
      
      visit '/'
      fill_in "Title:", with: new_title
      fill_in "Body:", with: new_body
      click_on 'Save'

      expect(current_path).to eq root_path
      expect(page).to have_selector('.idea', count: 1)
      expect(Idea.all.count).to eq 1
  end
end