class CreateArticles < ActiveRecord::Migration

  def self.up
    create_table :articles do |t|
      t.string :title
      t.text :text
      t.integer :position

      t.timestamps
    end

    add_index :articles, :id

    load(Rails.root.join('db', 'seeds', 'articles.rb'))
  end

  def self.down
    if defined?(UserPlugin)
      UserPlugin.destroy_all({:name => "articles"})
    end

    if defined?(Page)
      Page.delete_all({:link_url => "/articles"})
    end

    drop_table :articles
  end

end
