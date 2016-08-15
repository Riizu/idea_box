class Idea < ApplicationRecord
    validates :title, presence: true
    validates :body, presence: true
    validates :quality, presence: true

    enum quality: [:swill, :plausible, :genius]
end