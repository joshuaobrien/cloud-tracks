class SplitterService
    def initialzie

    end

    def split_tape(source, timings)
        timings.each do |track|
            puts track

            start = Time.at(track['start_time']).utc.strftime("%H:%M:%S")
            puts start
            finish = Time.at(track['end_time']).utc.strftime("%H:%M:%S")
            puts finish

            #duration = Time.at(finish.to_time - start.to_time).utc.strftime("%H:%M:%S")
            duration = Time.at(track['end_time'].to_i - track['start_time'].to_i).utc.strftime("%H:%M:%S")
            puts duration
            puts source
            puts ""

            ffmpeg_call = "ffmpeg -ss " + track['start_time'].to_s + " -i " + "'" + source +"'"+ " -vn -c copy -t " + duration.to_s + " '" + track['title'] + ".m4a" + "'"
            system ffmpeg_call
        end

        return true
    end
end
