require 'rails_helper'

describe "Upvote endpoint" do
    it "Upvotes an idea" do
        idea = create(:idea)

        get "/api/v1/ideas/#{idea.id}/upvote"

        expect(response).to be_success

        parsed_idea = JSON.parse(response.body)["idea"]

        expect(parsed_idea["quality"]).to eq "plausible"
    end

    it "won't upvote an idea that is already at max (genius)'" do
        idea = create(:idea, quality: 1)

        get "/api/v1/ideas/#{idea.id}/upvote"

        expect(response).to be_success

        parsed_idea = JSON.parse(response.body)["idea"]

        expect(parsed_idea["quality"]).to eq "genius"
    end
end