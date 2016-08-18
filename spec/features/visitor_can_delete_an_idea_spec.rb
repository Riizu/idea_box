require 'rails_helper'

RSpec.feature describe "A visitor can delete an existing idea" do
  scenario "they delete an idea", :js => true do
      idea = create(:idea)
      
      visit '/'

      within("#idea-#{idea.id}") do
        click_on 'Delete'
      end

      expect(current_path).to eq root_path
      expect(page).to_not have_selector('.idea')
      expect(Idea.all.count).to eq 0
  end
end