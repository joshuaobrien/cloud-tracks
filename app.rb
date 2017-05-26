require 'sinatra'
require 'sinatra/json'
require 'bundler'
require 'youtube-dl.rb'
require 'pp'
require 'sinatra/activerecord'
require './config/environments'


load 'lib/services/download_service.rb'
load 'lib/services/splitter_service.rb'

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
    splitter.split_tape(filename, metadata)
    puts 'Ayy nice'
end