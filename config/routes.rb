Rails.application.routes.draw do
  root to: "ideas#index"

  namespace :api do
    namespace :v1 do
      resources :ideas, only: [:index, :create, :destroy, :update] do
          get "upvote", to: "ideas/upvote#index"
          get "downvote", to: "ideas/downvote#index"
        end
    end
  end
end
