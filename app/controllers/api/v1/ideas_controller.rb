class Api::V1::IdeasController < ApiBaseController
    def index
        render json: Idea.order(created_at: :desc)
    end
end