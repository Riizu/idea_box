class Idea < ApplicationRecord
    validates :title, presence: true
    validates :body, presence: true
    validates :quality, presence: true

    enum quality: [:swill, :plausible, :genius]

    def upvote
        if quality_below_bounds?
            update_attributes(quality: quality_before_type_cast + 1 )
        end
    end

    private

    def quality_below_bounds?
        return true if Idea.new(title: title, body: body, quality: quality_before_type_cast + 1).valid?
    end
end