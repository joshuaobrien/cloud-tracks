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

downloader = DownloadService.new
splitter = SplitterService.new

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