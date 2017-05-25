require 'sinatra'
require 'sinatra/json'
require 'bundler'
require 'youtube-dl.rb'
require 'pp'

Bundler.require
require 'track'

load 'lib/services/download_service.rb'
load 'lib/services/splitter_service.rb'

DataMapper.setup(:default, 'sqlite::memory:')
DataMapper.finalize
DataMapper.auto_migrate!


downloader = DownloadService.new
splitter = SplitterService.new

get '/' do
    system "youtube-dl --skip-download -j https://www.youtube.com/watch?v=MOFG0dtkGRk"
    "you've happened upon a terrible fate, haven't you?\n"
end

post '/real/download_tape' do
    content_type :json

    puts params[:url]
    raw_video_info = `youtube-dl https://www.youtube.com/watch?v=MOFG0dtkGRk`

end

post '/test/download' do
    content_type :json

    puts params[:url]

    puts 'Downloading...'
    filename = downloader.download_tape(params[:url])
    puts 'Ripping...'
    metadata = downloader.rip_metadata(params[:url])
    puts 'Splitting..'
    splitter.split_tape(params[:url], metadata)
    puts 'Ayy nice'
end

def dat_split(source, track_data)
    track_data.each do |track|
        #start = Time.parse(track['start'])
        #finish = Time.parse(track['end'])

        start = Time.at(track['start']).utc.strftime("%H:%M:%S")
        puts start
        finish = Time.at(track['end']).utc.strftime("%H:%M:%S")
        puts finish



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