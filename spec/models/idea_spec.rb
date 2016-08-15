require 'rails_helper'

RSpec.describe Idea, type: :model do
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:body) }
  it { should validate_presence_of(:quality) }

  it { should define_enum_for(:quality).with([:swill, :plausible, :genius]) }

  it "should start with a default quality of swill" do
    idea = create(:idea)

    expect(idea.quality).to eq "swill"
  end
end
