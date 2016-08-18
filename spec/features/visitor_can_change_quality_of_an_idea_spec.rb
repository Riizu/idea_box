require 'rails_helper'

RSpec.feature describe "A visitor can change the quality of an idea" do
  scenario "they upvote an idea", :js => true do
      idea = create(:idea)
      
      visit '/'
      
      within("#idea-#{idea.id}") do
        click_on 'Thumbs Up'
      end

      expect(current_path).to eq root_path
      
      within("#idea-#{idea.id}") do
        expect(page).to have_content "plausible"
        expect(page).to_not have_content "swill"
      end  
  end

  scenario "they downvoting an idea", :js => true do
      idea = create(:idea)
      
      visit '/'
      
      within("#idea-#{idea.id}") do
        click_on 'Thumbs Down'
      end

      expect(current_path).to eq root_path
      
      within("#idea-#{idea.id}") do
        expect(page).to_not have_content "plausible"
        expect(page).to have_content "swill"
      end
  end
end