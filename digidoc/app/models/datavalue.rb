class Datavalue
  include Mongoid::Document
  field :name, type: String
  field :value, type: String
  field :fieldType, type: String

  # An Invoice owns these fields
  embedded_in :invoice
end
