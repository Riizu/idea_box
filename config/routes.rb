Rails.application.routes.draw do
  root to: "ideas#index"

  namespace :api do
    namespace :v1 do
      resources :ideas, only: [:index, :create]
    end
  end
end
