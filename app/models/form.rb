class Form
  include Mongoid::Document
  include Mongoid::Versioning # Allows to navigate data history. 
  include Mongoid::Paranoia # Avodis real delete, only hide records. 
  include Mongoid::Timestamps # Adds a created_on date.  <- AWESOME :)
  include Mongoid::MultiParameterAttributes

  field :title, type: String
  field :documentType, type: String
  field :description, type: String
  field :createdTime, type: Date
  field :agency, type: String

  validates_presence_of :title, :description, :documentType

# Fields that give the form its structure. 
  embeds_many :datafields # Example: [{"name": "email", "fieldType": "text"},{"name": "agency","fieldType": "text"},{"name": "role","fieldType": "text"}]

end
