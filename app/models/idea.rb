class Idea < ApplicationRecord
    validates :title, presence: true
    validates :body, presence: true
    validates :quality, presence: true

    enum quality: [:swill, :plausible, :genius]

    def upvote
        if within_upper_bounds?
            update_attributes(quality: quality_before_type_cast + 1 )
        end
    end

    def downvote
        if within_lower_bounds?
            update_attributes(quality: quality_before_type_cast - 1 )
        end
    end

    private

    def within_upper_bounds?
        return (quality_before_type_cast + 1) <= (Idea.qualities.length - 1)
    end

    def within_lower_bounds?
        return (quality_before_type_cast - 1) >= 0
    end
end