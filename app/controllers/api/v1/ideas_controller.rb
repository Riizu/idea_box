class Api::V1::IdeasController < ApiBaseController
    def index
        render json: Idea.order(created_at: :desc)
    end

    def create
        render json: Idea.create(idea_params)
    end

    private

    def idea_params
        params.permit(:title, :body)
    end
end