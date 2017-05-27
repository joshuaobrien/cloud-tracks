class Playlists< ActiveRecord::Migration[5.1]
  def self.up
    create_table :playlists do |p|
      p.bigint :playlist_id
      p.bigint :user_id
      p.string :name
    end
  end
end

