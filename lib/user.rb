require 'sinatra'
require 'sinatra/activerecord'

class User < ActiveRecord::Base
    validates_uniqueness_of :username
    has_secure_password
end