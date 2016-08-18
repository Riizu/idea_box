require 'rails_helper'

RSpec.feature describe "A visitor can view existing ideas" do
  scenario "visits the homepage", :js => true do
      create_list(:idea, 5)

      visit '/'

      expect(page).to have_selector('.idea', count: 5)
  end
end