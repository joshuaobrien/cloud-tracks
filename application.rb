require 'sinatra'
require 'sinatra/json'
require 'bundler'

Bundler.require

get '/' do
    "you've happened upon a terrible fate, haven't you?\n"
end