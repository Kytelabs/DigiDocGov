class Invoice
  include Mongoid::Document

  include Mongoid::Versioning # Allows to navigate data history. 
  include Mongoid::Paranoia # Avodis real delete, only hide records. 
  include Mongoid::Timestamps # Adds a created_on date.  < - AWESOME.
  include Mongoid::MultiParameterAttributes

  field :title, type: String
  field :description, type: String
  field :createdTime, type: Date
  
  field :current, type: Boolean, :default => false 
  field :signatureStatus, type: Boolean, :default => false 

  # Creator Info
  field :creatorEmail, type: String
  field :creatorName, type: String
  field :creatorAgency, type: String
  field :creatorRole, type: String

# Signee Info
  field :signeeEmail, type: String
  field :signeeName, type: String
  field :signeeAgency, type: String
  field :signeeRole, type: String
  field :signature, type: Array  
  
# Embedded Relations
  embeds_many :datavalues
end
