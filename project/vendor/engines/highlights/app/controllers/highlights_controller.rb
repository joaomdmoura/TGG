class HighlightsController < ApplicationController

  before_filter :find_all_highlights
  before_filter :find_page

  def index
    # you can use meta fields from your model instead (e.g. browser_title)
    # by swapping @page for @highlight in the line below:
    present(@page)
  end

  def show
    @highlight = Highlight.find(params[:id])

    # you can use meta fields from your model instead (e.g. browser_title)
    # by swapping @page for @highlight in the line below:
    present(@page)
  end

protected

  def find_all_highlights
    @highlights = Highlight.order('position ASC')
  end

  def find_page
    @page = Page.where(:link_url => "/highlights").first
  end

end
