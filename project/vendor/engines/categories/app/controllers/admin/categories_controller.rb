module Admin
  class CategoriesController < Admin::BaseController

    crudify :category,
            :title_attribute => 'name', :xhr_paging => true

  end
end
