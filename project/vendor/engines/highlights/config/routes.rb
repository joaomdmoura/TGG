::Refinery::Application.routes.draw do
  resources :highlights, :only => [:index, :show]

  scope(:path => 'refinery', :as => 'admin', :module => 'admin') do
    resources :highlights, :except => :show do
      collection do
        post :update_positions
      end
    end
  end
end
