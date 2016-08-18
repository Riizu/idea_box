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

    it "sends a new idea" do
        title = "Test title"
        body = "test body"
        post "/api/v1/ideas?title=#{title}&body=#{body}"

        expect(response).to be_success

        parsed_idea = JSON.parse(response.body)["idea"]
        saved_idea = Idea.first

        expect(parsed_idea).to_not include("created_at")
        expect(parsed_idea).to_not include("updated_at")
        expect(parsed_idea["title"]).to eq title
        expect(parsed_idea["body"]).to eq body

        expect(saved_idea.title).to eq title
        expect(saved_idea.body).to eq body
        expect(saved_idea.quality).to eq "swill"
    end

    it "delete an existing idea" do
        idea = create(:idea)

        delete "/api/v1/ideas/#{idea.id}"

        expect(response).to be_success

        parsed_idea = JSON.parse(response.body)["idea"]

        expect(Idea.all.count).to eq 0

        expect(parsed_idea).to_not include("created_at")
        expect(parsed_idea).to_not include("updated_at")
        expect(parsed_idea["title"]).to eq idea.title
        expect(parsed_idea["body"]).to eq idea.body
    end

    it "edits an existing idea's title" do
        idea = create(:idea)
        new_title = "The Best Title"

        patch "/api/v1/ideas/#{idea.id}?title=#{new_title}"

        expect(response).to be_success

        parsed_idea = JSON.parse(response.body)["idea"]

        expect(parsed_idea).to_not include("created_at")
        expect(parsed_idea).to_not include("updated_at")
        expect(parsed_idea["title"]).to eq new_title
        expect(parsed_idea["body"]).to eq idea.body
    end

    it "edits an existing idea's body" do
        idea = create(:idea)
        new_body = "The best body"

        patch "/api/v1/ideas/#{idea.id}?body=#{new_body}"

        expect(response).to be_success

        parsed_idea = JSON.parse(response.body)["idea"]

        expect(parsed_idea).to_not include("created_at")
        expect(parsed_idea).to_not include("updated_at")
        expect(parsed_idea["title"]).to eq idea.title
        expect(parsed_idea["body"]).to eq new_body
    end
end