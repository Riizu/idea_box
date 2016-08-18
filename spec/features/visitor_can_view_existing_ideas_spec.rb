require 'rails_helper'

RSpec.feature describe "A visitor can view existing ideas" do
  before(:all) do
    Capybara.current_driver = :webkit
  end

  scenario "runs something fancy with javascript" do
      ideas = create_list(:idea, 5)

      visit '/'

      expect(page).to have_selector('.idea', count: 5)
  end

  after(:all) do
    Capybara.use_default_driver
  end
end