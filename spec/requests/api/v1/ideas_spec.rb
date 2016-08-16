require 'rails_helper'

describe "Ideas endpoint" do
    it "sends an index of ideas sorted by most recent" do
        ideas = create_list(:idea, 2)
        get "/api/v1/ideas"

        expect(response).to be_success

        parsed_ideas = JSON.parse(response.body)["ideas"]

        expect(parsed_ideas.count).to eq(2)
        expect(parsed_ideas.first).to_not include("created_at")
        expect(parsed_ideas.first).to_not include("updated_at")
        expect(parsed_ideas.first["title"]).to eq ideas.last.title

        expect(parsed_ideas.last).to_not include("created_at")
        expect(parsed_ideas.last).to_not include("updated_at")
        expect(parsed_ideas.last["title"]).to eq ideas.first.title
    end
end