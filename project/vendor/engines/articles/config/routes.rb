::Refinery::Application.routes.draw do
  resources :articles, :only => [:index, :show]

  scope(:path => 'refinery', :as => 'admin', :module => 'admin') do
    resources :articles, :except => :show do
      collection do
        post :update_positions
      end
    end
  end
end
