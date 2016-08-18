class Api::V1::Ideas::DownvoteController < ApiBaseController
    def index
        idea = Idea.find(params[:idea_id])
        idea.downvote
        render json: idea
    end
end