class Api::V1::Ideas::UpvoteController < ApiBaseController
    def index
        idea = Idea.find(params[:idea_id])
        idea.upvote
        render json: idea
    end
end