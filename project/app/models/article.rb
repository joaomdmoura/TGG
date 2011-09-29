class Article < ActiveRecord::Base
	acts_as_indexed :fields => [:title, :text]
	validates :title, :presence => true, :uniqueness => true
	validates_presence_of :category_id
	belongs_to :category
	has_many :article 
end