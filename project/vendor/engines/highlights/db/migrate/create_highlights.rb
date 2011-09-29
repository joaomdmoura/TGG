class CreateHighlights < ActiveRecord::Migration

  def self.up
    create_table :highlights do |t|
      t.integer :article_id
      t.integer :category_id
      t.string :color
      t.string :alignment
      t.integer :position

      t.timestamps
    end

    add_index :highlights, :id

    load(Rails.root.join('db', 'seeds', 'highlights.rb'))
  end

  def self.down
    if defined?(UserPlugin)
      UserPlugin.destroy_all({:name => "highlights"})
    end

    if defined?(Page)
      Page.delete_all({:link_url => "/highlights"})
    end

    drop_table :highlights
  end

end
