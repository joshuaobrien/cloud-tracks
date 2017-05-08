require 'sinatra'
require 'sinatra/json'
require 'bundler'
require 'youtube-dl.rb'

Bundler.require

get '/' do
    "you've happened upon a terrible fate, haven't you?\n"
end

post '/test/download' do
    content_type :json

    video = YoutubeDL::Video.new(params[:url])
    video.options.configure do |c|
        c.get_filename = true
        c.output = "%(title)s.mp3"
        c.extract_audio = true
        c.audio_format = 'mp3'

        puts 'Downloading...'
    end

    video.download

    puts video.filename + ' downloaded!'
    status 201
    json "success"
end