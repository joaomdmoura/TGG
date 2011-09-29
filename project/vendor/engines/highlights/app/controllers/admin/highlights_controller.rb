module Admin
  class HighlightsController < Admin::BaseController

    crudify :highlight,
            :title_attribute => 'color', :xhr_paging => true

  end
end
