FactoryGirl.define do
    factory :idea do
        title
        body "Test Body"
    end

    sequence :title do |n|
        "Title #{n}"
    end
end