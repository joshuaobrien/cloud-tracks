class PlaylistTracks < ActiveRecord::Migration[5.1]
  def self.up
    create_table :playlist_track do |pt|
      pt.bigint :playlist_id
      pt.bigint :track_id
    end
  end
end

