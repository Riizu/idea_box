class Api::V1::IdeasController < ApiBaseController
    def index
        render json: Idea.order(created_at: :desc)
    end

    def create
        render json: Idea.create(idea_params)
    end

    def update
        idea = Idea.find(params[:id])
        idea.update_attributes(idea_params)
        render json: idea
    end

    def destroy
        idea = Idea.find(params[:id])
        idea.delete
        render json: idea
    end

    private

    def idea_params
        params.permit(:title, :body)
    end
end