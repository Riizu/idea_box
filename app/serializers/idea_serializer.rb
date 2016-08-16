class IdeaSerializer < ActiveModel::Serializer
    attributes :title, :body, :quality
end