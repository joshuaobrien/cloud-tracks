
class DownloadService
    def initialize()

    end

    def download_tape(url)
        video = YoutubeDL::Video.new(url)
        video.options.configure do |c|
            c.get_filename = true
            c.output = "%(title)s.m4a"
            c.format = "140"

            puts 'Downloading...'
        end

        video.download

        return video.filename
    end

    def rip_metadata(url)
        url = "https://www.youtube.com/watch?v=MOFG0dtkGRk"
        #raw_video_info = `youtube-dl --skip-download -j https://www.youtube.com/watch?v=MOFG0dtkGRk`
        raw_video_info = `youtube-dl --skip-download -j #{url}`
        json_video_info = JSON.parse(raw_video_info)
        return json_video_info['chapters']

    end
end