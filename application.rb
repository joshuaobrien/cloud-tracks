require 'sinatra'
require 'sinatra/json'
require 'bundler'
require 'youtube-dl.rb'
require 'pp'

Bundler.require
require 'track'

DataMapper.setup(:default, 'sqlite::memory:')
DataMapper.finalize
DataMapper.auto_migrate!

get '/' do
    system "youtube-dl --skip-download -j https://www.youtube.com/watch?v=MOFG0dtkGRk"
    "you've happened upon a terrible fate, haven't you?\n"
end

post '/test/download' do
    content_type :json

    puts params[:url]

    video = YoutubeDL::Video.new(params[:url])
    video.options.configure do |c|
        c.get_filename = true
        #c.output = "%(title)s.mp3"
        c.output = "source.m4a"
        c.format = "140"

        puts 'Downloading...'
    end

    video.download

    puts video.filename + ' downloaded!'

    timing = rip_timings(video.filename)

    dat_split(video.filename, timing)

end

def rip_timings(name)
    # temporarily stubbed until we get /real data/
    puts 'Ripping timing for ' + name
    track_data = read_temp_data()

    return track_data
end

def dat_split(source, track_data)
    track_data.each do |track|
        start = Time.parse(track['start'])
        finish = Time.parse(track['end'])


        duration = Time.at(finish.to_time - start.to_time).utc.strftime("%H:%M:%S")

        #ffmpeg_call = "ffmpeg -ss " + track['start'] + " -i " + source + " -vn -c copy -t " + duration.to_s + " '" + track['title'] + ".m4a" + "'"
        ffmpeg_call = "ffmpeg -ss " + track['start'] + " -i source.m4a -vn -c copy -t " + duration.to_s + " '" + track['title'] + ".m4a" + "'"
        system ffmpeg_call

    end

    status 201
    json "success"
end

get '/test/chop' do

    track_data.each do |track|
        start = Time.parse(track['start'])
        finish = Time.parse(track['end'])


        duration = Time.at(finish.to_time - start.to_time).utc.strftime("%H:%M:%S")

        ffmpeg_call = "ffmpeg -ss " + track['start'] + " -i totoro.m4a -vn -c copy -t " + duration.to_s + " '" + track['title'] + ".m4a" + "'"
        system ffmpeg_call

    end

    status 201
    json "success"
end


def read_temp_data()
    file = File.read('temp.json')
    return JSON.parse(file)['tracks']
end

#raw_video_info = `youtube-dl --skip-download -j https://www.youtube.com/watch?v=MOFG0dtkGRk`
#json_video_info = JSON.parse(raw_video_info)
#puts json_video_info['chapters']