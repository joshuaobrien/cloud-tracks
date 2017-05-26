class Users < ActiveRecord::Migration[5.1]
  def self.up
    create_table :users do |u|
      u.string :username
      u.string :password_digest
    end
  end
end
