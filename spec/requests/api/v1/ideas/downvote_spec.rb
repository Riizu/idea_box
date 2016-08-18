require 'rails_helper'

describe "Downvote endpoint" do
    it "downvotes an idea" do
        idea = create(:idea, quality: 1)

        get "/api/v1/ideas/#{idea.id}/downvote"

        expect(response).to be_success

        parsed_idea = JSON.parse(response.body)["idea"]

        expect(parsed_idea["quality"]).to eq "swill"
    end

    it "won't downvote an idea that is already at min (swill)'" do
        idea = create(:idea, quality: 0)

        get "/api/v1/ideas/#{idea.id}/downvote"

        expect(response).to be_success

        parsed_idea = JSON.parse(response.body)["idea"]

        expect(parsed_idea["quality"]).to eq "swill"
    end
end