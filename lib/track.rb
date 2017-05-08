class Track
    include DataMapper::Resource

    property :id, Serial
    property :title, String
    property :artist, String
    property :source, String
    property :start, Integer
    property :end, Integer
    property :created_at, DateTime
    property :updated_at, DateTime

    validates_presence_of :title
    validates_presence_of :artist
    validates_presence_of :source
    validates_presence_of :start
    validates_presence_of :end
end
