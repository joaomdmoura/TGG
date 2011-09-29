module Admin
  class ArticlesController < Admin::BaseController

    crudify :article, :xhr_paging => true

  end
end
