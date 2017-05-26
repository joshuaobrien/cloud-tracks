class Tracks < ActiveRecord::Migration[5.1]
  def self.up
    create_table :tracks do |t|
      t.string :name
      t.string :artist
      t.integer :duration
      t.string :source
      t.string :filepath
      t.string :genre
    end
  end
end
