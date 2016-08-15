FactoryGirl.define do
    factory :idea do
        title
        body "Test Body"
        quality 0
    end

    sequence :title do |n|
        "Title #{n}"
    end
end