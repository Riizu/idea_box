require 'rails_helper'

RSpec.feature "A visitor can view all their ideas" do
    scenario "They visit the index page" do
        ideas = create_list(:idea, 2)

        visit '/'

        expect(page).to have_content "IdeaBox"

        within '.new-idea-form' do
            expect(page).to have_content "Add an Idea"

            expect(page).to have_selector("input[type=text][name='title']")
            expect(page).to have_selector("input[type=text][name='body']")
            expect(page).to have_selector("input[type=submit][value='Save']")
        end

        expect(page).to have_content "Most Recent Ideas"

        within '.ideas' do
            within '#idea-2' do
                expect(page).to have_content ideas[1].title
                expect(page).to have_content ideas[1].body
                expect(page).to have_content ideas[1].quality
            end

            within '#idea-1' do
                expect(page).to have_content ideas[0].title
                expect(page).to have_content ideas[0].body
                expect(page).to have_content ideas[0].quality
            end         
        end
    end
end