require 'sinatra'
require 'sinatra/json'
require 'bundler'
require 'youtube-dl.rb'
require 'pp'
require 'sinatra/activerecord'
require './config/environments'


load 'lib/services/download_service.rb'
load 'lib/services/splitter_service.rb'
load 'lib/track.rb'
load 'lib/user.rb'

downloader = DownloadService.new
splitter = SplitterService.new


#track = Track.create(name: title, artist: artist, duration: duration_in_seconds, filepath: path+"/"+track['title']+".m4a")
#user = User.create(username: "hey", password: "datstick")



post '/real/download_tape' do
    content_type :json

    url = params[:url].to_s

    raw_video_info = `youtube-dl --skip-download -j #{url}`
    json_video_info = JSON.parse(raw_video_info)
end

post '/test/download' do
    content_type :json

    puts params[:url]

    puts 'Downloading...'
    filename = downloader.download_tape(params[:url])
    puts 'Ripping...'
    metadata = downloader.rip_metadata(params[:url])
    puts 'Splitting..'
    splitter.split_tape(filename, metadata)
    puts 'Ayy nice'
end

post '/test/create_user' do
    unless params[:username].nil? || params[:password].nil?

        user = User.new
        user.username = params[:username]
        user.password = params[:password]

        if user.save
            status 200
            json 'ok'
        else
            status 400
            json 'not ok'
        end
        
    end
end