require 'spec_helper'

describe Highlight do

  def reset_highlight(options = {})
    @valid_attributes = {
      :id => 1,
      :color => "RSpec is great for testing too"
    }

    @highlight.destroy! if @highlight
    @highlight = Highlight.create!(@valid_attributes.update(options))
  end

  before(:each) do
    reset_highlight
  end

  context "validations" do
    
    it "rejects empty color" do
      Highlight.new(@valid_attributes.merge(:color => "")).should_not be_valid
    end

    it "rejects non unique color" do
      # as one gets created before each spec by reset_highlight
      Highlight.new(@valid_attributes).should_not be_valid
    end
    
  end

end