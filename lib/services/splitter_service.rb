load 'lib/track.rb'
load 'lib/playlist_track.rb'

class SplitterService
    def initialzie

    end

    def split_tape(source, metadata)

        new_playlist_id = PlaylistTrack.maximum(:playlist_id).to_i + 1

        metadata['chapters'].each do |track|
            artist, title = track['title'].split('-')[0], track['title'].split('-')[1]
            if artist then artist.strip! end
            if title then title.strip! end
            puts artist
            puts title
            puts metadata['fulltitle']


            start = Time.at(track['start_time']).utc.strftime("%H:%M:%S")
            finish = Time.at(track['end_time']).utc.strftime("%H:%M:%S")

            duration = Time.at(track['end_time'].to_i - track['start_time'].to_i).utc.strftime("%H:%M:%S")
            duration_in_seconds = Time.at(track['end_time'].to_i - track['start_time'].to_i).utc

            # make a new directory if one doesn't exist
            path = "splittapes/" + metadata['fulltitle']
            path_mkdir= "splittapes/" + "'" + metadata['fulltitle'] + "'"
            mkdir_call = "mkdir " + path_mkdir
            system mkdir_call

            ffmpeg_call = "ffmpeg -ss " + track['start_time'].to_s + " -i " + '"' + source + '"' + " -vn -c copy -t " + duration.to_s + " \"" + path + "/" + track['title'] + ".m4a" + "\""
            #ffmpeg_call = "ffmpeg -ss " + track['start_time'].to_s + " -i " + "'" + source +"'"+ " -vn -c copy -t " + duration.to_s + " 'top_kek/boii/" + track['title'] + ".m4a" + "'"
            puts ffmpeg_call
            system ffmpeg_call



            track = Track.create(name: title, artist: artist, duration: duration_in_seconds, filepath: path+"/"+track['title']+".m4a")
            PlaylistTrack.create(playlist_id: new_playlist_id, track_id: track.id)
        end

        return true
    end
end
