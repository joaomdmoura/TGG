class Highlight < ActiveRecord::Base

  acts_as_indexed :fields => [:color, :alignment]

  validates :color, :presence => true, :uniqueness => true
  
end
