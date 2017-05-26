require 'sinatra'
require 'sinatra/activerecord'

class Track < ActiveRecord::Base
    has_secure_password
end