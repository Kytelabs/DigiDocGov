class Datafield
  include Mongoid::Document
  field :name, type: String
  field :fieldType, type: String

  validates_presence_of :name, :fieldType

  # A form owns these fields
  embedded_in :form

end
